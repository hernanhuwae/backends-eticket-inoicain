import { version } from 'mongoose'
import swaggerAutogen from 'swagger-autogen'

const doc = {
    info : {
        version : "v0.0.1",
        title : "Documentation API eTicket INOICAIN",
        description : "Documentation API eTicket INOICAIN",

    },
    servers : [
        {
            url : "http://localhost:8000/api",
            description : "Local Server"
        },
        {
            url : "https://backends-eticket-inoicain.vercel.app/",
            description : "Deploy Server"
        },

    ],
    components : {
         securitySchemes : {
            bearerAuth: {
                type : "http",
                scheme: "bearer"
            }
         },
         schemas : {
            LoginRequest : {
                identifier : "inoicain",
                password : "12345678"
            }
         }
    }
} 

//Type "npx tsc --init" to activate tsconfig.json
//Find line 42 to uncommand "resolveJsonModule": true, 
//Then "npm run docs" to add new file "swagger_output.json" on docs file automatically

const outputFile = "./swagger_output.json" 


const endpointsFiles = ["../routes/api.ts"]


swaggerAutogen({openapi: "3.0.0"})(outputFile, endpointsFiles, doc)