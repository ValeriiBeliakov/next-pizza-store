
import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { useEffect, useRef } from "react";

export default function Home() {
 
  return <>
  <Container className="mt-10">
    <Title text="Все пиццы" size="lg" className="font-extrabold"/>
  </Container>
    <TopBar/>
  <Container className="mt-10 pb-14">
 <div className="flex gap-[80px]">
  <div  className="w-[250px]">
  <Filters/>
  </div>
  <div className="flex-1">
  <div className="flex flex-col gap-16">
   {/* список товаров */}

   <ProductsGroupList title="Пиццы" items={[
    {
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },
    {
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },{
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },{
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },{
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    }
    ]} categoryId={1}/>
    <ProductsGroupList title="Закуски" items={[
    {
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },
    {
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },{
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },{
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    },{
      id:1,
      name:"Пицца", 
      price:1000, 
      items:[{price:550}],
      imageUrl:"https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif"
    }
    ]} categoryId={2}/>
  </div>
  </div>
 </div>
  </Container>
  
  </>
}
