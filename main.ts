import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";

const quotes = [
  `“You are the shuckiest shuck faced shuck in the world!”
― James Dashner, The Maze Runner`,
`“I'm unpredictable, I never know where I'm going until I get there, I'm so random, I'm always growing, learning, changing, I'm never the same person twice. But one thing you can be sure of about me; is I will always do exactly what I want to do.”
― C. JoyBell C.`,
`“That proves you are unusual," returned the Scarecrow; "and I am convinced that the only people worthy of consideration in this world are the unusual ones. For the common folks are like the leaves of a tree, and live and die unnoticed.”
― L. Frank Baum, The Land of Oz`,
`“But that was life: Nobody got a guided tour to their own theme park. You had to hop on the rides as they presented themselves, never knowing whether you would like the one you were in line for...or if the bastard was going to make you throw up your corn dog and your cotton candy all over the place.”
― J.R. Ward, Crave`,
`“Her name badge read: Hello! My name is DIE, DEMIGOD SCUM!”
― Rick Riordan, The Son of Neptune`,
`“A musician must make music, an artist must paint, a poet must write, if he is to be ultimately at peace with himself. What a man can be, he must be”
― Abraham Maslow`,
`“Insane means fewer cameras!”
― Ally Carter, Only the Good Spy Young`,
`“OK," Josh said evenly, "I've seen men made of mud, I guess I can accept spying rats. Do they talk?" he wondered aloud.
Don't be ridiculous," Flamel snapped, "They're rats."
Josh really didn't think it was a ridiculous suggestion.”
― Michael Scott, The Alchemyst`,
];

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


// api routes
const apis = new Router()
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/quote", (context) => {
    const quote = quotes[getRandomIntInclusive(0, quotes.length-1)]
    context.response.body = quote;
  });

const router = new Router().use("/api", apis.routes(), apis.allowedMethods());

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// serve static files
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public/`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

await app.listen({ port: 8000 });
