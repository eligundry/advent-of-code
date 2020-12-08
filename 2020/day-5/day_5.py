MAX_ROW = 127
MAX_COL= 7

# https://adventofcode.com/2020/day/5
# @TODO Ugh this is frustrating, I'm off by 1 somewhere
def partition_to_seat_id(partition: str):
    row_range = (0, MAX_ROW)
    col_range = (0, MAX_COL)
    row = 0
    col = 0

    for i, instruction in enumerate(partition):
        if instruction == 'F':
            row_range = (row_range[0], ((sum(row_range) + 1) // 2) - 1)
        elif instruction == 'B':
            row_range = (((sum(row_range) + 1) // 2) - 1, row_range[1])
        elif instruction == 'L':
            col_range = (col_range[0], ((sum(col_range) + 1) // 2) - 1)
        elif instruction == 'R':
            col_range = (((sum(col_range) + 1) // 2) - 1, col_range[1])

        if instruction == 'F' or  instruction == 'B':
            print(instruction, row_range)
        else:
            print(instruction, col_range)

        if i == 6:
            if instruction == 'F':
                row = min(row_range)
            else:
                row = max(row_range)

        if i == 9:
            if instruction == 'L':
                col = max(col_range)
            else:
                col = min(col_range)

    return (row * 8) + col

test_case = partition_to_seat_id("FBFBBFFRLR")
assert test_case == 357, f"{test_case} is not 357"

seats = []

with open('input.txt') as fh:
    for line in fh:
        seats.append(partition_to_seat_id(line))

print(f"The seat with the highest ID is {max(seats)}")
