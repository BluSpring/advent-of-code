import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicLong;

// Part 2 was so bad that I switched to Java just to multithread.
// Do you REALIZE how BAD that had to be for me to switch from JS.
public class Day5_Part2 {
    private record Pair(long first, long second) {}

    private static long findMapped(long num, List<List<Long>> mappings) {
        var found = num;

        for (List<Long> map : mappings) {
            if (num >= map.get(1) && num < map.get(1) + map.get(2)) {
                var i = num - map.get(1);
                found = map.get(0) + i;
                break;
            }
        }

        return found;
    }

    public static void main(String[] args) {
        var start = System.currentTimeMillis();
        try {
            var file = Files.readAllLines(Path.of("./input.txt"));

            var maps = new LinkedList<List<List<Long>>>();
            var sum = 0L;

            // [[dest, src, len]]
            var current = new LinkedList<List<Long>>();

            for (String line : file) {
                if (line.trim().isBlank())
                    continue;

                if (line.startsWith("seeds: ")) {
                    continue;
                }

                if (line.trim().endsWith("map:")) {
                    if (!current.isEmpty()) {
                        maps.add(new LinkedList<>(current));
                        current.clear();
                    }
                    continue;
                }

                var arr = new LinkedList<Long>();
                for (String num : line.split(" ")) {
                    arr.add(Long.parseLong(num));
                }

                current.add(arr);
            }

            maps.add(new LinkedList<>(current));
            current.clear();

            var locations = new LinkedList<Long>();

            var currentSeedStart = -1L;
            var seedPairs = new LinkedList<Pair>();

            for (String num : file.get(0).replace("seeds: ", "").split(" ")) {
                if (currentSeedStart == -1L) {
                    currentSeedStart = Long.parseLong(num);
                    continue;
                }

                var range = Long.parseLong(num);
                seedPairs.add(new Pair(currentSeedStart, range));

                currentSeedStart = -1L;
            }

            var executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() - 1);

            var currentPair = 0;
            for (Pair pair : seedPairs) {
                System.out.println("Now on pair " + currentPair++ + " (at " + (System.currentTimeMillis() - start) + "ms)");

                var futures = new LinkedList<Future<Long>>();
                var currentLowest = new AtomicLong(Long.MAX_VALUE);
                for (long seed = pair.first; seed < pair.first + pair.second; seed++) {
                    long finalSeed = seed;
                    futures.add(executorService.submit(() -> {
                        var currentMapping = finalSeed;

                        for (List<List<Long>> map : maps) {
                            currentMapping = findMapped(currentMapping, map);
                        }

                        return currentMapping;
                    }));

                    if (futures.size() >= 10000) {
                        for (Future<Long> future : futures) {
                            var value = future.get();

                            if (value < currentLowest.get())
                                currentLowest.set(value);
                        }

                        futures.clear();
                    }
                }

                for (Future<Long> future : futures) {
                    var value = future.get();

                    if (value < currentLowest.get())
                        currentLowest.set(value);
                }

                futures.clear();

                locations.add(currentLowest.get());
            }

            Collections.sort(locations);
            sum = locations.get(0);

            System.out.println("sum: " + sum);
            System.out.println("took " + (System.currentTimeMillis() - start) + "ms");
        } catch (IOException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
