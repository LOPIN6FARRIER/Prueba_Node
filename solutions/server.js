import express from 'express'
export const app=express()
app.use(express.json())
const items=[
    {
        id:1,
        content:'Item 1'
    }
]
//restfull
//get/items
//get/items/:id
//post/items
//put/items/:id
//delete/items/:id

app.get('/items',(req,res)=>{
    return res.json(items)
})

app.get('/items/:id',(req,res)=>{
    const {id}=req.params
    const itemfound=items.find(item=>item.id===Number(id))
    return res.json(itemfound)
})

app.post('/items',(req,res)=>{
    const {content}=req.body
    const newid=items.length+1
    const newitem={id:newid,content}
    items.push(newitem)
    return res.json(newitem)
})

app.put('/items/:id',(req,res)=>{
    const {id}=req.params
    const {content}=req.body
    // const index=items.findIndex(item=>item.id===id)
    // items[index]={id,...item}
    // return res.json(items[index])
    const itemfound=items.find(item=>item.id===Number(id))
    itemfound.content=content
    return res.json(itemfound)
})

app.delete('/items/:id',(req,res)=>{
    const {id}=req.params
    const index=items.findIndex(item=>item.id===Number(id))
    items.splice(index,1)
    return res.status(200).json()
})


export const server=app.listen(process.env.PORT ?? 3000,()=>{
    console.log('server is running')
})