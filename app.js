import {validateSchema,validateSubmission} from "./schema.js";
const form=document.querySelector("#dynamic-form"),status=document.querySelector("#status"),preview=document.querySelector("#preview");
try{
 const response=await fetch("./form.json");if(!response.ok)throw Error("Unable to load form schema");
 const config=await response.json();validateSchema(config.fields);
 document.querySelector("#title").textContent=config.title;document.querySelector("#description").textContent=config.description||"";
 for(const field of config.fields){
  const label=document.createElement("label");label.textContent=field.label+(field.required?" *":"");
  let control;
  if(field.type==="textarea")control=document.createElement("textarea");
  else if(field.type==="select"){control=document.createElement("select");const empty=document.createElement("option");empty.value="";empty.textContent="Choose an option";control.append(empty);for(const choice of field.options){const option=document.createElement("option");option.value=choice;option.textContent=choice;control.append(option);}}
  else{control=document.createElement("input");control.type=field.type;}
  control.name=field.name;control.id="field-"+field.name;control.required=!!field.required;if(field.maxLength)control.maxLength=field.maxLength;
  label.htmlFor=control.id;label.append(control);form.append(label);
 }
 const button=document.createElement("button");button.type="submit";button.textContent="Preview submission";form.append(button);
 form.addEventListener("submit",event=>{event.preventDefault();form.querySelectorAll(".error").forEach(el=>el.remove());const values=Object.fromEntries(new FormData(form));const result=validateSubmission(config.fields,values);if(!result.valid){for(const [name,msg] of Object.entries(result.errors)){const control=form.elements.namedItem(name);const error=document.createElement("span");error.className="error";error.textContent=msg;control.parentElement.append(error);}status.textContent="Please correct the highlighted fields.";return;}preview.textContent=JSON.stringify(result.values,null,2);status.textContent="Form validated locally. No data was submitted.";});
}catch(error){status.textContent=error.message;document.querySelector("#title").textContent="Form unavailable";}
