import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signInInput, signUpInput } from 'medium-common';

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET: string,
  }
}>();

userRouter.post('/userFind', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try{
    const user = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    });
    if(!user){
      c.status(200);
      return c.json({mssg: "User not exist"});
    }
    c.status(404);
    return c.json({mssg: "User exists"});
  }catch{
    c.status(403);
    return c.json({mssg: "Error"});
  }
})

userRouter.post('/signUp', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({msg: "Invalid inputs"});
    }
    const find = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })
    if(find){
      c.status(403);
      return c.json({mssg: "User exists"});
    }
    try{
      const users = await prisma.user.create({
        data: {
          name: body.username,
          email: body.email,
          password: body.password,
        }
      });
      const jwt = await sign({id: users.id}, c.env.JWT_SECRET);
      return c.json({
        token : jwt
      });
    }catch(e){
      c.status(409  );
      return c.json({msg: "Error while signing up"});
    }
  })
  
  userRouter.post('/signIn', async (c) => {
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({msg: "Invalid inputs"});
    }

    const users = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
    if(!users){
      c.status(403);
      return c.json({
        error: "User not found"
      })
    }
    const jwt = await sign({id: users.id}, c.env.JWT_SECRET);
    return c.json({
      token: jwt
    })
  
  })

  export default userRouter;