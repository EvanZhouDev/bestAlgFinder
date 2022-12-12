let algSpeed = require("./algSpeed").algSpeed;
const puppeteer = require("puppeteer");
const colors = require("colors/safe");
let arguments = process.argv.slice(2);
let algType = "pll/y";
let topAmount = 5;

if (arguments[0] !== undefined) {
	algType = arguments[0];
} else {
	console.log(colors.red("No case provided. Using default " + algType));
}
if (arguments[1] !== undefined) {
	topAmount = arguments[1];
} else {
	console.log(
		colors.red("No amount of algs to find provided. Using default " + topAmount)
	);
}

const url = "http://algdb.net/puzzle/333/" + algType;
console.log(
	colors.green.bold("\nScraping algorithms from algDB... Please wait.")
);
let algorithms;
async function run() {
	return new Promise(async (resolve, reject) => {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(url);
			await page.waitForSelector("tr");

			algorithms = await page.evaluate(() => {
				let results = [];
				let items = document.querySelectorAll("tr");
				console.log(items);
				items.forEach((item) => {
					results.push({
						alg: item.querySelector("td").innerText,
						date: item.querySelector("td:nth-of-type(2)").innerText,
						votes: item.querySelector("td:nth-of-type(3)").innerText,
						coefficient: NaN,
					});
				});
				return results;
			});
			browser.close();
			return resolve(algorithms);
		} catch (error) {
			return reject(error);
		}
	});
}

let algCoefficentTop = [];
let votesTop = [];
run()
	.then(() => {
		if (topAmount > algorithms.length) {
			topAmount = algorithms.length;
			console.log(
				colors.red.bold(
					"Amount of algs to fetch is greater than amount available. Only fetching available."
				)
			);
		}
		for (let i = 0; i < algorithms.length; i++) {
			algorithms[i].coefficient = algSpeed(algorithms[i].alg);
		}
		console.log(
			colors.blue.bold.underline(
				"\n\nTheoretical Best Algs for: " + algType + "\n"
			)
		);
		algorithms.sort((a, b) => a.coefficient - b.coefficient);
		for (let i = 0; i < topAmount; i++) {
			algCoefficentTop.push(algorithms[i].alg);
			console.log(colors.bold(`Entry #${i + 1}`));
			console.log(
				colors.bold.red("   Algorithm: ") + colors.white(algorithms[i].alg)
			);
			console.log(
				colors.bold.yellow("   Date Created: ") +
					colors.white(algorithms[i].date)
			);
			console.log(
				colors.bold.green("   Votes Received: ") +
					colors.white(algorithms[i].votes)
			);
			console.log(
				colors.bold.blue("   Move Coefficient: ") +
					colors.white.inverse.bold(algorithms[i].coefficient)
			);
			console.log("\n");
		}
		console.log(
			colors.blue.bold.underline(
				"\n\nHighest Voted Entries for: " + algType + "\n"
			)
		);
		algorithms.sort((a, b) => +b.votes - +a.votes);
		for (let i = 0; i < topAmount; i++) {
			votesTop.push(algorithms[i].alg);
			console.log(colors.bold(`Entry #${i + 1}`));
			console.log(
				colors.bold.red("   Algorithm: ") + colors.white(algorithms[i].alg)
			);
			console.log(
				colors.bold.yellow("   Date Created: ") +
					colors.white(algorithms[i].date)
			);
			console.log(
				colors.bold.green("   Votes Received: ") +
					colors.white.inverse.bold(algorithms[i].votes)
			);
			console.log(
				colors.bold.blue("   Move Coefficient: ") +
					colors.white(algorithms[i].coefficient)
			);
			console.log("\n");
		}
		const overlap = algCoefficentTop.filter((value) =>
			votesTop.includes(value)
		);
		if (overlap.length > 0) {
			console.log(
				colors.bold.underline.blue(`\nOverall best from top ${topAmount}:\n`)
			);
			for (let i = 0; i < overlap.length; i++) {
				console.log(colors.bold.red("Algorithm: ") + colors.white(overlap[i]));
			}
		} else {
			console.log(
				colors.bold.underline.blue(
					"\n No overlap found between lowest coefficient and highest votes."
				)
			);
		}
	})
	.catch(console.error);
