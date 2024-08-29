import packageJson from '../../package.json';
import { history } from '../stores/history';
import { enigmas, getEnigma } from '../interfaces/enigma';

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => {
    const numberOfEnigmas = enigmas.length;
    const introText = `
Welcome to the Enigma Game!
Your objective is to solve a series of ${numberOfEnigmas} increasingly difficult enigmas (from 1 to ${numberOfEnigmas}) by using specific commands.
Each enigma will provide you with a key upon solving it. Collect all the keys to unlock the final message.

Here are the commands you can use:
`;

    const commandDescriptions = {
      enigma: "enigma <number>: View the enigma with the given number.",
      hint: "enigma <number> hint: Get a hint for the specified enigma.",
      answer: "enigma <number> <answer>: Submit an answer for the specified enigma.",
      unlock: "unlock <key1> <key2> ...: Use the keys you've collected to unlock the final message.",
      help: "help: Display this help message.",
      clear: "clear: Clear the terminal screen.",
      // Add descriptions for other relevant commands as needed...
    };

    const availableCommands = Object.keys(commandDescriptions).map(command => {
      return `- ${command}: ${commandDescriptions[command] || 'No description available.'}`;
    }).join('\n');

    return introText + availableCommands;
  },
  clear: () => {
    history.set([]);

    return '';
  },
  enigma: (args: string[]) => {
    if (args.length === 0) {
      return 'Usage: enigma <number>, enigma <number> <answer>, or enigma <number> hint';
    }

    const enigmaId = parseInt(args[0]);
    const enigma = getEnigma(enigmaId);

    if (!enigma) {
      return `Enigma ${enigmaId} does not exist.`;
    }

    if (args[1] === 'hint') {
      return `Hint: ${enigma.hint}`;
    } else if (args[1]) {
      const userAnswer = args.slice(1).join(' ').toLowerCase();
      if (userAnswer === enigma.answer.toLowerCase()) {
        return `Correct! Your key: ${enigma.key}`;
      } else {
        return 'Incorrect answer. Try again.';
      }
    } else {
      return `Enigma ${enigma.id}: ${enigma.question}`;
    }
  },
  unlock: (args: string[]) => {
    if (args.length !== enigmas.length) {
      return `You need to provide ${enigmas.length} keys to unlock.`;
    }

    const incorrectKeys: string[] = [];

    // Compare provided keys with the correct ones
    enigmas.forEach((enigma, index) => {
      if (enigma.key !== args[index]) {
        incorrectKeys.push(`Key #${index + 1} ('${args[index]}')`);
      }
    });

    if (incorrectKeys.length === 0) {
      return 'Congratulations! You have successfully unlocked the final message!';
    } else {
      return `Some keys are incorrect: ${incorrectKeys.join(', ')}`;
    }
  },
};
