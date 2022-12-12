# Best Algorithm Finder
A simple way to find the best algorithms for any case available on the AlgDB database.

## Made Possible By:
### Trangium's Movecount Coefficient Calculator:
Website: https://trangium.github.io/MovecountCoefficient/ <br/>
Source: https://github.com/trangium/trangium.github.io/blob/master/algSpeed.js

### AlgDB.net
Website: http://algdb.net

## Installation instructions:
<details>
<summary>TL;DR</summary>
Run the following:

```bash
git clone https://github.com/EvanZhouDev/BestAlgFinder.git
cd ./BestAlgFinder/
npm install
```
</details>

1. Clone the repository ```git clone https://github.com/EvanZhouDev/BestAlgFinder.git```
2. ```cd``` into the new folder ```cd ./BestAlgFinder/```
3. Install dependancies: ```npm install```
4. It is ready to use!

## How to Use:
1. ```cd``` into wherever you put your clone
2. Run ```node findBestAlg.js ${CASE} ${AMOUNT}```

### CASE Parameter
The first parameter, CASE, is what algorithm we are looking at. It follows the AlgDB format.
Here are some examples:
- Y Perm: ```pll/y```
- Na Perm: ```pll/na```
- OLL 1: ```oll/oll1```
- and so on...

If you want to know the path, then go the case on AlgDB and copy the part after "http://algdb.net/puzzle/333..." in the URL.

### AMOUNT Parameter
The second parameter, AMOUNT, is the top how many algorithms it will display and further analyze. Look at the next section for further explanation.

## Interpreting the Output
After you run the command, you will see 3 main sections.

### Ranking based on Algorithm Coefficient
The script automatically scrapes AlgDB for the requested algorithm and ranks them based on the Algorithm's 'coefficient.' The lower the better, and it should vary directly with the time it takes to do the algorithm. The amount listed will be the AMOUNT parameter.
### Ranking based on Votes
The script also automatically looks at what people have voted to be their favorite algorithm on AlgDB. The second section ranks it based on that. The mroe votes the better. The amount listed will be the AMOUNT parameter.
### Overall Best
The last section looks at the overlap between the first two sections. In theory, the algorithms listed under there should be the 'best' algorithms. If you do not see any overlap, increase the AMOUNT parameter.
*The calculation for these "overall best" algorithms may be subject to change*
