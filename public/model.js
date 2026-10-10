export const ingredients={
 rice:{name:'Рис',unit:'г',group:'Крупы и бакалея',price:16,pack:100},
 oats:{name:'Овсяные хлопья',unit:'г',group:'Крупы и бакалея',price:12,pack:100},
 bread:{name:'Цельнозерновой хлеб',unit:'г',group:'Крупы и бакалея',price:25,pack:100},
 flour:{name:'Пшеничная мука',unit:'г',group:'Крупы и бакалея',price:8,pack:100},
 chickpea:{name:'Нут',unit:'г',group:'Крупы и бакалея',price:24,pack:100},
 chicken:{name:'Куриное филе',unit:'г',group:'Мясо и рыба',price:48,pack:100},
 beef:{name:'Говядина',unit:'г',group:'Мясо и рыба',price:95,pack:100},
 fish:{name:'Рыба',unit:'г',group:'Мясо и рыба',price:110,pack:100},
 egg:{name:'Яйца',unit:'шт',group:'Молочные продукты и яйца',price:14,pack:1},
 yogurt:{name:'Йогурт',unit:'г',group:'Молочные продукты и яйца',price:35,pack:100},
 cheese:{name:'Сыр',unit:'г',group:'Молочные продукты и яйца',price:85,pack:100},
 tomato:{name:'Помидоры',unit:'г',group:'Овощи и фрукты',price:28,pack:100},
 cucumber:{name:'Огурцы',unit:'г',group:'Овощи и фрукты',price:22,pack:100},
 avocado:{name:'Авокадо',unit:'г',group:'Овощи и фрукты',price:65,pack:100},
 lettuce:{name:'Салат',unit:'г',group:'Овощи и фрукты',price:45,pack:100},
 banana:{name:'Бананы',unit:'г',group:'Овощи и фрукты',price:18,pack:100},
 berries:{name:'Ягоды',unit:'г',group:'Овощи и фрукты',price:70,pack:100},
 asparagus:{name:'Спаржа',unit:'г',group:'Овощи и фрукты',price:90,pack:100},
 peanuts:{name:'Арахис',unit:'г',group:'Крупы и бакалея',price:35,pack:100},
 sesame:{name:'Кунжут',unit:'г',group:'Крупы и бакалея',price:50,pack:100},
 oil:{name:'Оливковое масло',unit:'мл',group:'Крупы и бакалея',price:100,pack:100}
};
const dish=(id,name,image,meal,cuisine,time,kcal,allergens,items,steps)=>({id,name,image,meal,cuisine,time,kcal,allergens,items,steps});
export const dishes=[
 dish('oat','Фруктовый боул','fruit','Завтрак','Европейская',10,280,[],[['banana',150],['berries',100]],['Вымойте ягоды и очистите банан.','Нарежьте фрукты и соберите боул. Другие фрукты добавляйте с учётом ваших ограничений.']),
 dish('toast','Тост с авокадо и яйцом','toast','Завтрак','Европейская',15,410,['глютен','яйца'],[['bread',80],['avocado',80],['egg',1],['lettuce',20]],['Отварите яйцо 6–8 минут и поджарьте хлеб.','Разомните авокадо, выложите на тост с зеленью и яйцом.']),
 dish('bowl','Рисовый боул с яйцом','rice','Обед','Азиатская',25,520,['яйца'],[['rice',80],['egg',1],['tomato',100],['oil',10]],['Отварите рис в воде до готовности.','Обжарьте помидоры и яйцо. Подайте на рисе.']),
 dish('salad','Салат с авокадо и нутом','salad','Ужин','Средиземноморская',15,390,['арахис','кунжут'],[['avocado',80],['chickpea',70],['lettuce',60],['tomato',100],['peanuts',15],['sesame',5],['oil',10]],['Заранее отварите нут или используйте готовый без добавок.','Нарежьте овощи и авокадо, добавьте нут, арахис, кунжут и масло.']),
 dish('chickpea','Боул с нутом и овощами','chickpea','Обед','Средиземноморская',20,450,[],[['chickpea',90],['tomato',120],['cucumber',100],['lettuce',40],['oil',10]],['Используйте заранее отваренный нут.','Нарежьте овощи, соберите боул, заправьте маслом.']),
 dish('fish','Говядина со спаржей','fish','Ужин','Европейская',30,420,[],[['beef',180],['asparagus',150],['oil',10]],['Обжарьте говядину и доведите до безопасной внутренней температуры.','Приготовьте спаржу на пару, подайте с мясом.']),
 dish('burger','Домашний бургер','burger','Ужин','Американская',30,650,['глютен','молоко'],[['beef',150],['bread',100],['cheese',25],['tomato',60],['lettuce',20]],['Сформируйте котлету и приготовьте до безопасной внутренней температуры.','Поджарьте хлеб, соберите бургер с овощами и сыром.']),
 dish('dumplings','Домашние пельмени','dumplings','Обед','Азиатская',45,560,['глютен'],[['flour',100],['beef',100],['oil',5]],['Замесите тесто из муки и воды, оставьте на 15 минут.','Измельчите мясо, слепите пельмени. Варите до полной готовности начинки.']),
 dish('yogurt','Йогурт с фруктами и ягодами','yogurt','Завтрак','Европейская',5,310,['молоко'],[['yogurt',180],['banana',80],['berries',60]],['Вымойте ягоды и нарежьте банан.','Добавьте фрукты к натуральному йогурту.'])
];
export const defaultProfile={people:2,days:1,budget:1800,maxTime:45,goal:'Баланс',diet:'Все продукты',allergies:[],excluded:'',cuisines:[]};
export const cost=d=>Math.round(d.items.reduce((sum,[id,q])=>sum+ingredients[id].price*q/ingredients[id].pack,0));
const norms={'арахис':'арахис','орехи':'арахис','молочные продукты':'молоко','лактоза':'молоко','молочное':'молоко','орех':'орехи','яйцо':'яйца','пшеница':'глютен','морепродукты':'рыба'};
export function allowed(d,p){
 const excludes=p.excluded.toLowerCase().split(/[,;\n]+/).map(v=>v.trim()).filter(Boolean);
 const labels=d.items.map(([id])=>ingredients[id].name.toLowerCase());
 if(p.allergies.some(a=>d.allergens.includes(a)||d.allergens.includes(norms[a]||a)))return false;
 if(excludes.some(x=>labels.some(n=>n.includes(x))||d.allergens.includes(norms[x]||x)||d.name.toLowerCase().includes(x)))return false;
 if(p.diet==='Вегетарианское'&&d.items.some(([id])=>['chicken','beef','fish'].includes(id)))return false;
 if(p.diet==='Веганское'&&d.items.some(([id])=>['chicken','beef','fish','egg','yogurt','cheese'].includes(id)))return false;
 return d.time<=p.maxTime;
}
export function candidates(profile,votes,meal){
 return dishes.filter(d=>allowed(d,profile)&&votes[d.id]!=='dislike'&&(!meal||d.meal===meal)).sort((a,b)=>{
 const score=d=>(votes[d.id]==='like'?10:0)+(profile.cuisines.includes(d.cuisine)?4:0)+(profile.goal==='Лёгкое меню'?(700-d.kcal)/100:profile.goal==='Больше энергии'?d.kcal/100:0);
 return score(b)-score(a)||cost(a)-cost(b);
 });
}
export function buildMenu(profile,votes){
 const days=Math.min(7,Math.max(1,profile.days));const result=[];
 for(let day=0;day<days;day++)for(const meal of ['Завтрак','Обед','Ужин']){
 const options=candidates(profile,votes,meal);
 if(!options.length)throw new Error(`Нет подходящих блюд для раздела «${meal}». Измените время, вкусы или добавьте рецепты; аллергии и запреты не будут сняты.`);
 const d=options[day%options.length];result.push({id:`${day}-${meal}`,day,meal,dishId:d.id,portions:profile.people});
 }
 // Budget is a hard daily limit; replace costly choices with safe, lower cost dishes.
 for(let day=0;day<days;day++){
 const rows=result.filter(r=>r.day===day);
 const total=()=>rows.reduce((s,r)=>s+cost(dishes.find(d=>d.id===r.dishId))*r.portions,0);
 for(const row of [...rows].sort((a,b)=>cost(dishes.find(d=>d.id===b.dishId))-cost(dishes.find(d=>d.id===a.dishId)))){
 if(total()<=profile.budget)break;
 const cheapest=candidates(profile,votes,row.meal).sort((a,b)=>cost(a)-cost(b))[0];row.dishId=cheapest.id;
 }
 if(total()>profile.budget)throw new Error(`Для ${profile.people} чел. минимальная стоимость дня — ${total()} ₽. Увеличьте бюджет или измените параметры.`);
 }
 return result;
}
export function shopping(menu,overrides={},manual=[]){
 const grouped=new Map();
 for(const row of menu){const d=dishes.find(d=>d.id===row.dishId);if(!d)continue;
 for(const [id,q]of d.items){if(!grouped.has(id))grouped.set(id,{id,...ingredients[id],quantity:0});grouped.get(id).quantity+=q*row.portions;}}
 const combined=new Map();
 for(const item of [...grouped.values(),...manual]){const key=item.name.trim().toLocaleLowerCase('ru-RU')+'|'+item.unit;const existing=combined.get(key);if(existing)existing.quantity+=item.quantity;else combined.set(key,{...item});}
 return [...combined.values()].map(item=>({...item,...overrides[item.id],quantity:Math.round((overrides[item.id]?.quantity??item.quantity)*10)/10}));
}
export function replaceDish(menu,id,dishId){return menu.map(row=>row.id===id?{...row,dishId}:row);}
export function exportList(items){return items.filter(i=>!i.home).map(i=>`${i.name}: ${i.quantity} ${i.unit}`).join('\n');}
export const stores=[{id:'vkusvill',name:'ВкусВилл',subtitle:'Продукты на каждый день',url:'https://vkusvill.ru',search:'https://vkusvill.ru/search/?q='},{id:'perekrestok',name:'Перекрёсток',subtitle:'Большой выбор продуктов',url:'https://www.perekrestok.ru',search:'https://www.perekrestok.ru/cat/search?search='}];
export function prepareOrder(items,store){return {store,cartSupported:false,items:items.filter(i=>!i.home).map(i=>({...i,matched:false,productUrl:store.search+encodeURIComponent(i.name)}))};}
