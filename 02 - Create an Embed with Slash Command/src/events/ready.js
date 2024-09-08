const cowsay = require("cowsay");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(
      cowsay.say({
        text: `✅ ${client.user.tag} is ready to do FUN!`,
        f: "whale",
      })
    );

    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);

      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,
            },
          ],

          status: statusArray[option].status,
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
};
