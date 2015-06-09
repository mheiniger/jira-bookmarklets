/* Create the bookmarklet here: http://mrcoles.com/bookmarklet/ */
/* This bookmarklet uses tab delimiter for pasting into google spreadsheets */
 
/* copy selected issues from agile planning lists */
var issues = jQuery('.ghx-selected')
  .filter('.js-issue')
  .map(function(i, issue) {
    var k = jQuery(issue).attr("data-issue-key");
    var s = jQuery(issue).find('.ghx-summary').attr("title");
    var type = jQuery(issue).find('.ghx-type').attr("title");
    var link = jQuery(issue).find('.js-key-link').attr("href");
    return { key: k, summary: s, type: type, link: link}
  }).toArray();
  
/* copy issue from open issue */
var t = document.title.replace(" - JIRA", "");
var match = t.match(/\[(.*)\]/);
if (match) {
  var k = match[1];
  issues.push({ key: k, summary: t.replace("[" + k + "] ", "")})
}
 
/* create list */
var delimiter = String.fromCharCode(9);
var host = window.location.protocol + "//" + window.location.hostname;
var links = jQuery.map(issues, function(i){ 
  return i.type + ":" + delimiter + "[" + i.key + "]" + delimiter + host + i.link + delimiter + i.summary;
});
 
window.prompt ("Copy to clipboard: Ctrl+C, Enter", links.join("\r\n"));