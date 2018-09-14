const path = require('path')
const fs = require('fs')
const solc = require('solc')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const contractsFolder = 'contracts';
const compiledFolder = 'src/compiled';
const compiledOutputFormat = '.json';

async function execute(contractPath, contractFileName) {
    const outputPath = path.resolve(
        __dirname,
        compiledFolder,
        contractFileName.split(".")[0] + compiledOutputFormat,
    );
    console.log('Compiling: ' + contractFileName);
    const source = await readFile(contractPath, 'utf8');
    const output = solc.compile(source, 1);

    if(output.errors){
        output.errors.map((e) => {
            console.log(e);
        });
        return;
    }

    const str = JSON.stringify(output.contracts[':' + contractFileName.split(".")[0] ]);
    await writeFile(outputPath, str, 'utf8');
    console.log('Successfully compiled.')
}

function executeArr(dirname){
    fs.readdir(dirname, (err, files) => {
        files.forEach(file => {
            execute(path.join(__dirname, contractsFolder, file), file);
        });
    })
}

// execute()
executeArr(path.join(__dirname, contractsFolder));
