#!/usr/bin/env node

// console.log('cli working !');
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const ejs = require("ejs");

inquirer
	.prompt([
		{
			type: "input",
			name: "name",
			message: "Project name?",
		},
	])
	.then((answers) => {
		console.log(answers);
		// 模版目录
		const temDir = path.join(__dirname, "templates");
		// 目标目录
		const destDir = process.cwd();

		// 输出
		fs.readdir(temDir, (err, files) => {
			if (err) throw err;
			files.forEach((file) => {
				ejs.renderFile(path.join(temDir, file), answers, (err, res) => {
					if (err) throw err;
					// console.log(res);
          fs.writeFileSync(path.join(destDir,file),res)
				});
			});
		});
	});
