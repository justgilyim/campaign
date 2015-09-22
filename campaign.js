/**
 * Created by Gilbert on 9/22/2015.
 */
function currencyToNum(currencyString) {
    return Number(currencyString.replace(/[^0-9\.]+/g,""));
}

var tempdata = campaignContributions.slice(0, 2);
console.log(tempdata);
function add(memo, record){
    return memo + currencyToNum(record["Amount"]);
}
function party(data){
    return _.groupBy(data, "Party");
};
function contributionsByParty(data){
    return _.mapObject(party(data), function(value, key){
        return _.reduce(value, add, 0);
    });
}
console.log(contributionsByParty(tempdata));

function partyContributionObjects(data){
    var contributions = contributionsByParty(data);
    return _.map(_.keys(contributions),function(key){
            return {name: key, amount: contributions[key]};
    });
}
function maxContributionsToParty(data){
    return _.max(partyContributionObjects(data), function(record){return record.amount;});
}
console.log(maxContributionsToParty(tempdata));