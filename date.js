
module.exports=getDate;
// or exports=....
function getDate(){
var today= new Date();
// We are trying to grab day details using Method toLocaleDatestring
var options={
  weekday:"long",
  day:"numeric",
  month:"long",
};
var day= today.toLocaleDateString("en-US",options);
return day;
}
