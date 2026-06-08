# AgentVault (Primetrade.ai) - BD GTM Strategy & Outreach Hub

This repository contains the Business Development Intern task submission for **AgentVault**, a no-code platform enabling users to build and launch autonomous 24/7 crypto trading agents.

To deliver a premium presentation for the interviewing team, this project is built as a **zero-friction, interactive strategy brochure website** that can be loaded instantly in any browser (or hosted via GitHub Pages) with no installation, databases, or API keys required.

---

## 📂 Deliverables in this Repository

1. **Official PDF Proposal Document**: [AgentVault GTM Proposal - Business Development Task.pdf](./AgentVault%20GTM%20Proposal%20-%20Business%20Development%20Task.pdf)
   * A 2-page print document answering all three prompt requirements: User Segments, Outreach Templates, and GTM Campaigns.
   * Compiled directly from our custom print layout stylesheet using headless Chrome.
2. **Interactive GTM Strategy Brochure**: [index.html](./index.html)
   * **Live Active Demo:** [primetrade-gtm.vercel.app](https://primetrade-gtm.vercel.app)
   * A dynamic single-page web dashboard designed with sleek glassmorphism, responsive panels, and Web3 branding.
   * Features:
     * **Granular Segment Research:** Detailed analysis of DeFi Yield Farmers & LPs vs. University Blockchain Clubs.
     * **Interactive Outreach Hub:** Customize names, protocols, and custom hooks. Select from **3 platform-tailored copywriting hooks** for Discord, Twitter/X, and LinkedIn, and see them rendered in realistic, platform-styled chat frames (avatars, bubbles, and statuses).
     * **GTM Playbooks:** Expandable playbooks detailing execution steps and Milestone KPI dashboards.
3. **Report Document Source**: [proposal.html](./proposal.html)
   * The dedicated HTML report template designed for printing. It utilizes elegant Georgia headers and standard report page margins to format the PDF as a professional corporate document rather than a webpage.

---

## 🛠️ How to View the Interactive Brochure

Since the application is built using standard, self-contained HTML/CSS/JS with relative paths, there are zero server dependencies:

### 1. Locally
Double-click [index.html](./index.html) in your file explorer to open it directly in Chrome, Edge, Firefox, or Brave.

### 2. Live on GitHub Pages (Recommended for Submission)
You can host this interactive deck live in under a minute:
1. Create a new public repository on GitHub.
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit - AgentVault GTM Proposal & Interactive Hub"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. Enable GitHub Pages:
   * Go to your repository settings on GitHub.
   * Click **Pages** in the left sidebar.
   * Under **Build and deployment**, select `main` branch and `/ (root)` folder, then click **Save**.
   * Your interactive deck will be live at `https://<your-username>.github.io/<your-repo-name>/`.
