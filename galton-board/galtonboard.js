let table = [];

function fillTable(rows, amount) {
    for(let i = 0; i < rows; i++) {
        let row = [];
        for(j = 0; j <= i; j++) {
            row.push(0);
        }
        table.push(row);
    }
    table[0][0] = amount;
}

function printBoard() {
    let board = "";
    for(i = 0; i < table.length; i++) {
        let line = "";
        for(j = 0; j < table.length - i; j++) {
            line += "   ";
        }
        for(j = 0; j < table[i].length; j++) {
            if(table[i][j] >= 100) {
                line += "  " + table[i][j] + " ";
            } else if(table[i][j] >= 10) {
                line += "   " + table[i][j] + " ";
            } else {
                line += "   " + table[i][j] + "  ";
            }
        }
        board += line + "\n";
    }
    process.stdout.write('\033c');
    process.stdout.write(board);
}

async function run(microseconds) {
    for(let i = 0; i < table.length - 1; i++) {
        for(let j = 0; j < table[i].length; j++) {
            for(let k = 0; k < table[i][j]; table[i][j]--) {
                if(Math.random() > 0.5) {
                    table[i + 1][j]++;
                } else {
                    table[i + 1][j + 1]++;
                }
                printBoard();
                await sleep(microseconds / 1000);
            }
        }
    }
    printBoard();
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

fillTable(10, 1000);
run(1000);