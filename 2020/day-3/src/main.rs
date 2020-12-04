use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

struct MapLine {
    trees: Vec::<bool>,
}

impl MapLine {
    fn parse(line: String) -> MapLine {
        let mut map_line = MapLine{
            trees: Vec::new(),
        };

        for c in line.chars().into_iter() {
            map_line.trees.push(c == '#')
        }

        return map_line;
    }

    fn tree_at_index(&self, idx: usize) -> bool {
        return self.trees[idx % self.trees.len()];
    }
}

struct Map {
    lines: Vec::<MapLine>,
}

impl Map {
    fn new() -> Map {
        return Map{
            lines: Vec::new(),
        };
    }

    // traverse the map and count how many trees you encounter
    fn traverse(&self, x: u64, y: u64) -> u64 {
        let mut trees_encountered: u64 = 0;
        let debug = x == 1 && y == 2;

        for (current_line, line) in self.lines.iter().enumerate() {
            if current_line % y as usize > 0 {
                continue;
            }

            let current_position = ((current_line * y as usize)) * x as usize;
            if debug {
                println!("current_position: {}, {}", current_line, current_position);
            }

            if line.tree_at_index(current_position) {
                trees_encountered += 1;
            }
        }

        return trees_encountered;
    }
}

// https://adventofcode.com/2020/day/3
fn main() {
    let mut map = Map::new();

    if let Ok(lines) = read_lines("./input.txt") {
        for line in lines {
            map.lines.push(MapLine::parse(line.unwrap()));
        }
    }

    let trees_encountered = map.traverse(3, 1);

    println!("On your sled down, you encounted {} trees", trees_encountered);

    // Now we need to traverse multiple times and multiply the amount of trees we see.
    // @TODO I can't get the right answer here. I think the last element is what is throwing this
    // off.
    let mut trees_encountered_multiple = 0;
    let traversal_methods = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    for traversal in traversal_methods.iter() {
        let trees = map.traverse(traversal[0], traversal[1]);
        println!("for right {}, down {}, you encountered {} trees", traversal[0], traversal[1], trees);

        if trees_encountered_multiple == 0 {
            trees_encountered_multiple += trees;
        } else {
            trees_encountered_multiple *= trees;
        }
    }

    println!("On your multiple sled rides, you encounted {} trees", trees_encountered_multiple);
}

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
