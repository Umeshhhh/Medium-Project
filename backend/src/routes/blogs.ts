import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlog, CreateBlog, updateBlog } from "medium-common";

const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL : string,
      JWT_SECRET: string,
    },
    Variables: {
      userId: string
    }
  }>()

  blogRouter.use('/*', async (c,next) => {
    const header : string = c.req.header('authorization') || "";
    const token = header.split(" ")[1];
    
    try{
      const response = await verify(token, c.env.JWT_SECRET)
      if(response.id){
        c.set('userId', `${response.id}`)
        await next();
      }
      else{
        c.status(403);
        return c.json({
          error: "You are not Logged In"
        });
      }
    }catch{
      c.status(403);
        return c.json({
          error: "Error while authenticating"
        });
    }

  })

  blogRouter.get('/authCheck', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const user = await prisma.user.findFirst({
      where:{
        id: userId
      }
    })
    c.status(200);
    return c.json({mssg: "User is authenticated", name: user?.name});
  })

  blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const date = new Date();
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({msg: "Invalid Inputs"});
    }
    const userId = c.get('userId');
    try{
      const blog =  await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          date: date.toString(),
          authorId: userId
        }
      });
    
      return c.json({blog})
    }catch{
      c.status(403);
      return c.text("Cannot create blog")
    }
  })

  blogRouter.put('/published', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try{
      const res = await prisma.post.update({
        where: {
          id: body.id
        },
        data: {
          published: body.published
        }
      })
      if(!res){
        c.status(404);
        return c.json({mssg: "Blog not found"});
      }
      c.status(200);
      return c.json({msg: "Blog published"});
    }catch{
      c.status(403);
      return c.json({msg: "Error while publishing blog"});
    }
  })
  
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());    
    
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({msg: "Invalid inputs"});
    }
    const update = await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content
      }
    });

    return c.json({id: update.id});
  })

  blogRouter.delete('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try{
      await prisma.post.delete({
        where: {
          id: body.id
        }
      })
      c.status(200);
      return c.json({msg: "Blog deleted successfully"});
    }catch{
      c.status(403);
      return c.json({msg: "Error while deleting blog"});
    }

  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    try{
      const blogs = await prisma.post.findMany({
        select:{
          content: true,
          title: true,
          id: true,
          date: true,
          published: true,
          author:{
            select:{
              name:true,
              id: true
            }
          }
        }
      });
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      return c.json({
        blogs,
        userId,
        username: user?.name
      });
    }catch{
      c.status(403);
      return c.json({msg: "Cannot get blogs"});
    }
  })
  
  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
      const id = c.req.param('id');
      const blog = await prisma.post.findFirst({
        where: {
          id: id
        },
        select:{
          content: true,
          title: true,
          date: true,
          author:{
            select:{
              name:true
            }
          }
        }
    })
    if(!blog){
      c.status(404);
      return c.json({msg: "No blog found", blog});
    }
    return c.json({blog});
    }catch{
      c.status(403);
      return c.json({msg: "Error while fetching blog"});
    }
  })

  export default blogRouter;