use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::collections::HashMap;

struct NorthPoleCredentials {
    data: HashMap<String, String>,
}

impl NorthPoleCredentials {
    fn parse(line: String) -> NorthPoleCredentials {
        return NorthPoleCredentials{
            data: HashMap::new(),
        }
    }

    fn update(&self, line: String) {

    }
}

fn main() {
    let mut creds = Vec::new();
    let mut current_cred = NorthPoleCredentials::parse(String::from(""));
    let mut currently_updating = false;

    if let Ok(lines) = read_lines("./input.txt") {
        for line in lines {
            let target_line = line.unwrap();

            if target_line == String::from("\n") {
                currently_updating = false;
                creds.push(current_cred);
                continue;
            }

            if currently_updating {
                current_cred.update(target_line);
            } else {
                current_cred = NorthPoleCredentials::parse(target_line);
            }
        }
    }
}

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
