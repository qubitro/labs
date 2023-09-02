# SenseCAP T1000 Data Visualization Demo

This demo demonstrates sensor data visualization with the Seeed Studio SenseCAP T1000 using Qubitro (DDP).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world)

![Screenshot](https://github.com/qubitro/labs/blob/main/sensecap-t1000-data-visualization-demo/src/assets/qubitro-seeed-studio-t1000-data-visualization-demo.png?raw=true)

## Features

- **Device**: [Seeed Studio SenseCAP T1000](https://www.seeedstudio.com/)
- **LNS (LoRaWAN Network Server)**: [Browse Integrations](https://www.thethingsnetwork.org/docs/lorawan/the-things-stack.html)
- **Data Processing**: [@qubitro/client Node.JS SDK](https://www.npmjs.com/package/@qubitro/client) with Qubitro (DDP)

## Quick Start

1. Set up the SenseCAP T1000 and connect it to an LNS, such as The Things Stack, Loriot, Actility, etc.
2. Set up a no-code integration between Qubitro and your chosen LNS using [Qubitro's no-code LNS integrations.](https://docs.qubitro.com/platform/lorawan/the_things_stack).
3. Provide the Device ID, Project ID, and API Key in the App.tsx


## Setup Locally

Make sure to install the dependencies:

```bash
npm install

npm run dev # or vite
```

## Contribution & Support

For issues or suggestions, please open an issue or make a pull request. Contributions are appreciated!

Thank you for trying out the SenseCAP T1000 Data Visualization Demo.