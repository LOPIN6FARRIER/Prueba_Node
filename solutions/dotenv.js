import fs from 'node:fs'
export function config({path='.env'}={}){

    try{
        const env=fs.readFileSync(path,'utf8')
        const lines=env.split('\n')
         lines.forEach(line=>{
            const [key,...value]=line.split('=')
            const joinedValue=value.join('=')

            const hastQuotes=joinedValue.startsWith('"')
             && joinedValue.endsWith('"') 
            
            

            const valueToStore=hastQuotes
            ?joinedValue.slice(1,-1)
            :joinedValue

            process.env[key]=valueToStore
         })    
        }
    catch(err){
     //   console.error(err)
    }
}

const dotenv={
    config
}

export default dotenv