import React,{useState,useMemo, useEffect} from "react";
import {format,addHours, subDays, addDays, setHours,setMinutes,setSeconds, isBefore,isEqual,parseISO} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'
import api from "../../services/api";

import { Container, Time } from "./styles";
import { MdChevronLeft,MdChevronRight}from 'react-icons/md'
import { pt } from "date-fns/locale";
import { string } from "prop-types";
const range=[8,9,10,11,12,13,14,15,16,17,18,19,20]

export default function Dashboard(){
    const[schedule,setSchedule]=useState([]);
    const[datea,setDatea]=useState(new Date());

  const[date,setDate]=useState(new Date());
  const dateFormatted=useMemo(
()=>format(date,"d 'de' MMMM",{locale:pt}),
[date]

  )
 
  console.log(dateFormatted)
useEffect(()=>{
async function loadSchedule(){
    const datea = format(date, "yyyy-MM-dd' T'HH:mm:ss'+00'")
    console.log(date)
    console.log(datea)
    const response= await api.get('schedule',{params:{date:datea}})
console.log(response)
//console.log(response.data.appointment[0].date)
let lista2=[{time:string,past:string,appointment:date,name:string}]
let lista1=[{time:string,past:string,appointment:date,name:string}]
const timezone=Intl.DateTimeFormat().resolvedOptions().timeZone
    const data=range.map(hour=>{
        const checkDate=setSeconds(setMinutes(setHours(date,hour),0),0)
        //console.log(checkDate)
        const compareDate=utcToZonedTime(checkDate,timezone)

        const isoDate1 = format(compareDate, "yyyy-MM-dd'T'HH:mm:ssxxx");


        const mapa=response.data.appointment.map(p=>(p.user))
//console.log(mapa[0])
const mapa2=mapa.map(v=>(v.name))
//console.log(mapa2[0])

const map=response.data.appointment.map(p=>(p.date))
//console.log(map[0])

const map2=map.map(o=>(addHours(parseISO(o),3)))
//console.log(map2[0])

const map22=map2.map(o=>format(o, "yyyy-MM-dd'T'HH:mm:ssxxx"))
//console.log(map22[0])



const map3=map2.map(j=>format(j,"HH:00'h'",{locale:pt}))
console.log(map3[0])
console.log(isoDate1)
for (let i = 0; i < map22.length; i++) {

    

        if (isoDate1===map22[i]) {
           lista1.push({
            time:`${hour}:00h`,
            past:isBefore(isoDate1,new Date()),
            appointment:map2[i],
            name:mapa2[i]
        })

        }else{
            lista2.push({
                time:`${hour}:00h`,
                past:isBefore(isoDate1,new Date()),
                appointment:undefined,
                name:undefined
            })
           
        }
       
     
     
     
    }
  
    const schedule2=schedule
    console.log(schedule2[10])
      
        
return{
    time:`${hour}:00h`,
    past: isBefore(compareDate,new Date()),
    appointment:map2.find(a=>isEqual(a,compareDate)),
}

    } )
console.log(schedule)

lista1.shift()
const schedule2=schedule
for (let i = 0; i < schedule.length; i++) {
    for (let o = 0; o < lista1.length; o++) {
   if (schedule2[i].time===lista1[o].time) {
     schedule2[i].past=lista1[o].past
     schedule2[i].appointment=lista1[o].appointment
   }
} 
}

for (let i = 0; i < schedule2.length; i++) {
   schedule2[i].time=schedule[i].time

}

for (let i = 0; i < data.length; i++) {
    for (let o = 0; o < lista1.length; o++) {
   if (data[i].time===lista1[o].time) {
     data[i].past=lista1[o].past
     data[i].appointment=lista1[o].appointment
     data[i].name=lista1[o].name
   }
} 
}

for (let i = 0; i < schedule2.length; i++) {
   data[i].time=schedule[i].time

}






console.log(data)
console.log(schedule)
console.log(schedule2)
console.log(schedule2)
setSchedule(data)
}
loadSchedule()
console.log(schedule)
},[date])





function handlePrevDay(){
setDate(subDays(date,1))
}
function handleNextDay(){
    setDate(addDays(date,1))
    }
    

    return(
      
<Container>
          <header>
            <div>
<div className="w">
          <button type="button" onClick={handlePrevDay} >
<MdChevronLeft size={36} color="#FFF"/>
</button>

<strong id="q">{dateFormatted}</strong>

<button type="button" onClick={handleNextDay} >
<MdChevronRight size={36} color="#FFF"/>
</button>
</div>
<ul>
    {schedule.map(time=>(
        <Time key={time.time} past={time.past} avaiable={!time.appointment}>
    <strong>{time.time}</strong>
    <div><br/></div>
    <span>{time.appointment ? time.name:'em aberto '}</span>
</Time>
//

    ))}


</ul>



</div>
            </header>
            </Container>
         
       
       
    )
}