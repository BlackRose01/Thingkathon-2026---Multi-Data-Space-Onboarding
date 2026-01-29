# Multi Data Space Onboarding - Thingkathon 2026 Munich

This repository contains all ideas and approaches which where developed by the team in this challenge during the Thingkathon 2026 in Munich.

## Challenge

The current concept to onboard a company for a data space is to fill out a simple form with file upload following by manual validation work. If a company would like to onboard to another data space they need to fill out the same information every time. Especially for SME's the workload is not easy.

Therefore the challenge was to create a flow which is easy-to-use for companies, automatizable and contains all required steps to onboard companies from any country.

## Approach

First of all all our notices can be found in the folder `concepts`.

The approach is a multi-step form with three levels. A level describes a point of view from a special entity. In our definition the most important entites were the goverment (Level 1) in which the data space operates, the industry (Level 2) which needs to be involved and the data space's (Level 3) business partner alignments. All questions in each level must answered. All other information are not relevant at the moment and would only decrease the onboarding experience.\
**Level 1**: Information that a government requires from the company to be onboarded and that must be requested from the operating company (e.g.: Does the company have a license to join a data space?).\
**Level 2**: Information which are required from the industry itself.\
**Level 3**: Information which was aligned from the already onboarded business partners or Data Space owner and needs to be fullfilled, e.g. at least acceptance of the terms and conditions.

The content for each level can adjusted in the backend. In combination with the Gaia-X onthology the information are interoperable between Operating Companies.

### Structur of the flow

1. The onboarding company must be choose between if they were already onboarded in another company. If they already member of another data space then the company must provide their DID in order to fetch already given information and validate the company's given information. Therefor it is possible to filter already given information and hide the form elements later.
2. Here the company must provide the company wallet (LDIP) and the wallet of managing director or an authorized signatory person (DIP). The DIP confirms that the company has the acknowledgement to onboard. (We assume that companies will use a highly standardized wallet, e.g. EUDI/eIDAS for Europe)
3. The wallets will be checked after a release from the owner (Login to the wallets), if the company is a legal entity and the person's wallet is a registered entity for the company.
4. The company needs to be fill out the information for level 1.
5. The company needs to be fill out the information for level 2.
6. The company needs to be fill out the information for level 3.
7. A screen with the summary.
8. Send the form (End of Demo)

As soon as a company submits its information, a system now has the option of initiating an automated check of all details.

- The DID supports the linking of data rooms but is not a static entity. Therefore, it cannot be used as a unique ID across data spaces.
- Standardized wallets simplify the complexity of verifying personal or company information, as an API implementation can connect multiple wallet providers.
- The use of the Gaia-X ontology, including the use of AI tools, supports the interoperability of data exchange between operating companies.
- The layer concept logically structures the form for the person entering the data. By requesting only important information, the input mask is clear for the person filling it out and also understands the meaning of the entries. Thanks to the highly customizable approach, each operating company can adapt its requirements to regional conditions.

The challenge of credential handling was also examined. Currently, new credentials are issued for the company during each onboarding process. These are not interoperable and therefore cannot be used in other data spaces. However, one possible solution could be for the EDC to take over this handling and use the request to determine which credential needs to be used.

### Usage

This main content of the repository is not only a small PoC for our idea it is also the presentation for our final Pitch.

1. Install NodeJS (>= 18)
2. Download the repository
3. Run `npm i` in the root folder to fetch all dependencies
4. Run `npm run dev` to start the development server

## Team

[Xin Dong](https://www.linkedin.com/in/xin-dong-3846817a/) - Mulan IT Solutions\
[Paul Patolla](https://www.linkedin.com/in/paul-patolla-221673245/) - University of Applied Sciences Dresden \
[Tobias Maier](https://www.linkedin.com/in/tobias-maier-486062172/) - NTTData \
[Tobias Obermeyer (Coach)](https://www.linkedin.com/in/tobermeyer/) - Catena-X \
[Nuno Reiner-Sobral (Coach)](https://www.linkedin.com/in/nunoreinersobral/) - Cofinity-X

This PoC was created with Google Gemini.
