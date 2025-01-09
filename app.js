import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
  InteractionResponseFlags,
} from "discord-interactions";
import { getRandomEmoji } from "./utils.js";
import { set_boss, get_boss, remove_boss } from "./boss.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  async function (req, res) {
    // Interaction type and data
    const { type, data } = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      // "test" command
      if (name === "test") {
        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: `hello world ${getRandomEmoji()}`,
          },
        });
      }

      if (name === "set_boss") {
        let options = data.options;
        let input = {};
        for (let option of options) {
          input[option.name] = option.value;
        }
        let response = await set_boss(input.name, input.position);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          flags: InteractionResponseFlags.EPHEMERAL,
          data: {
            content: `${response}`,
          },
        });
      }

      if (name === "remove_boss") {
        let options = data.options;
        let input = {};
        for (let option of options) {
          input[option.name] = option.value;
        }
        console.log(input);
        remove_boss(input.name, input.position);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `remove boss ${input.name} at ${input.position}`,
            flags: InteractionResponseFlags.EPHEMERAL,
          },
        });
      }

      if (name === "boss") {
        let response = await get_boss();
        console.log(response);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `${response}`,
            flags: InteractionResponseFlags.EPHEMERAL,
            embeds: [
              {
                image: {
                  url: "https://cdn.discordapp.com/app-assets/1326795645947875378/1326803354718048257.png?size=1024",
                },
                type: "rich",
                description: "",
                color: 0x00ffff,
              },
            ],
          },
        });
      }

      console.error(`unknown command: ${name}`);
      return res.status(400).json({ error: "unknown command" });
    }

    console.error("unknown interaction type", type);
    return res.status(400).json({ error: "unknown interaction type" });
  }
);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
