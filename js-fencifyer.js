const leftBorderWidth = 6;
const rightBorderWidth = 6;
const upperBorderWidth = 2;
const bottomBorderWidth = 2;
const pageLength = 20;


const { log } = require('console');
const fs = require('fs');

// Specify the path to the JS file you want to read
const filePath = './code.js';

try {
  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Split the content into lines
  const lines = fileContent.split('\n');
  let fancyLines = translate(lines); 
  createFile(fancyLines);

} catch (error) {
  console.error('Error reading the file:', error);
}



function getDocWidth(lines){
  let codeWidth = 0;
  lines.forEach((line, index) => {
    if (codeWidth < line.length){
      codeWidth = line.trim().length;
    };
  });
  let docWidth = codeWidth + leftBorderWidth + rightBorderWidth
  console.log(docWidth);
  return docWidth;
};

function countWhitespaceBefore(str) {
  const regex = /^[ \t\r\n]+/;
  const match = str.match(regex);
  return match ? match[0].length : 0;
}

function countWhitespaceAfter(str) {
  const regex = /[ \t\r\n]+$/.test(str) ? '' : '';
  const match = str.match(/[ \t\r\n]+$/);
  return match ? match[0].length : 0;
}

function createBorder(borderWidth){
  return `/*${"/".repeat(borderWidth-4)}*/`;
}


function translateLine(line, index, docWidth){
  let startPos = countWhitespaceBefore(line) + leftBorderWidth;
  let endPos = startPos + line.trim().length;  
  let fancyLine = "";
  fancyLine += createBorder(startPos);
  fancyLine += line.trim();
  fancyLine += createBorder(docWidth - endPos);
  console.log(fancyLine);
  return fancyLine;
}

function createHeader(docWidth, length){
  let headerLines = [];
  for (let i = 0; i < length; i++) {
    headerLines.push(`${"/".repeat(docWidth)}`);
  }
  return headerLines;
}


function translate(lines){
  let docWidth = getDocWidth(lines);
  fancyLines = [];
  createHeader(docWidth, upperBorderWidth).forEach(function(line){fancyLines.push(line);});
  lines.forEach((line, index) => {
    fancyLines.push(translateLine(line, index, docWidth));
  });
  createHeader(docWidth, bottomBorderWidth).forEach(function(line){fancyLines.push(line);});
  for (let i = 0; i < fancyLines.length; i++) {
    fancyLines[i] = " ".repeat(fancyLines.length - i) + fancyLines[i]
    
  }
  return fancyLines;
};



function createFile(lines, fileName = 'fancycode.js') {
  const fs = require('fs');
  // Join the lines array into a single string
  const content = lines.join('\n');
  // Write the content to the file
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log(`File '${fileName}' created successfully.`);
    }
  });
}