const supported=new Set(["text","email","number","textarea","select"]);
export function validateSchema(fields){
 if(!Array.isArray(fields)||fields.length===0)throw Error("At least one field required");
 const names=new Set();
 for(const field of fields){
  if(!field||typeof field.name!=="string"||!/^[a-z][a-z0-9_]*$/i.test(field.name)||names.has(field.name))throw Error("Invalid or duplicate field name");
  if(!supported.has(field.type)||typeof field.label!=="string"||!field.label.trim())throw Error("Invalid field definition");
  if(field.type==="select"&&(!Array.isArray(field.options)||!field.options.length||field.options.some(x=>typeof x!=="string"||!x)))throw Error("Select options required");
  names.add(field.name);
 }
 return fields;
}
export function validateSubmission(fields,values){
 validateSchema(fields);const errors={};const cleaned={};
 for(const field of fields){
  const value=String(values[field.name]??"").trim();
  if(field.required&&!value){errors[field.name]="This field is required";continue;}
  if(!value){cleaned[field.name]="";continue;}
  if(field.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))errors[field.name]="Enter a valid email";
  if(field.type==="number"&&!Number.isFinite(Number(value)))errors[field.name]="Enter a valid number";
  if(field.type==="select"&&!field.options.includes(value))errors[field.name]="Choose a listed option";
  if(field.maxLength&&value.length>field.maxLength)errors[field.name]="Too many characters";
  cleaned[field.name]=value;
 }
 return {valid:Object.keys(errors).length===0,errors,values:cleaned};
}
