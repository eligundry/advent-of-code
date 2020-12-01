use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

// https://adventofcode.com/2020/day/1
fn main() {
    // Read the numbers into a vec of ints
    let mut expenses = Vec::new();

    if let Ok(lines) = read_lines("./input.txt") {
        for line in lines {
            let expense = match line.unwrap().parse::<i64>() {
                Ok(i) => i,
                Err(_e) => panic!(_e),
            };

            expenses.push(expense);
        }
    }

    // Loop over both arrays to find the pairs that sum to 2020 and print the multiplication of
    // those values.
    'outer2: for (lhs_i, lhs_expense) in expenses.iter().enumerate() {
        for (rhs_i, rhs_expense) in expenses.iter().enumerate() {
            if lhs_i == rhs_i {
                continue;
            }

            let sum = lhs_expense + rhs_expense;

            if sum == 2020 {
                println!(
                    "{} + {} = 2020, {} * {} = {}", 
                    lhs_expense, 
                    rhs_expense,
                    rhs_expense,
                    lhs_expense,
                    rhs_expense * lhs_expense,
                );
                break 'outer2;
            }
        }
    }

    // Pt. 2: Do the same as above but for 3 values.
    'outer3: for (lhs_i, lhs_expense) in expenses.iter().enumerate() {
        for (rhs_i, rhs_expense) in expenses.iter().enumerate() {
            if lhs_i == rhs_i {
                continue;
            }

            for (mhs_i, mhs_expense) in expenses.iter().enumerate() {
                if mhs_i == lhs_i || mhs_i == rhs_i {
                    continue;
                }

                let sum = lhs_expense + mhs_expense + rhs_expense;

                if sum == 2020 {
                    println!(
                        "{} + {} + {} = 2020, {} * {} * {} = {}", 
                        lhs_expense, 
                        mhs_expense,
                        rhs_expense,
                        rhs_expense,
                        mhs_expense,
                        lhs_expense,
                        rhs_expense * lhs_expense * mhs_expense,
                    );
                    break 'outer3;
                }
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
