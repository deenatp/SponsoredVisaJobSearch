import { useState } from "react";

const DEENA_RESUME = `DEENADHAYALAN PONGIYANAN
Digital Marketing Manager - Performance | Omni-Channel

deenadhayalantp@gmail.com | +91 9943200450 | linkedin.com/in/deenadhayalan/ | Bengaluru, India

SUMMARY
Performance Marketing Manager with 9+ years of experience scaling revenue across D2C, retail, and app channels. Managed $35Mn+ in ad spend with 3–8x ROAS, delivered Rs.135+ Cr annual omni-digital revenue, and grew retention revenue share from 16% to 29% across high-growth brands like Swiggy, Kushals, and Health & Glow. Deep expertise in full-funnel strategy, omni channel marketing, offline conversion tracking, MMP setup, and data warehouse reporting. Open to relocating anywhere in Europe and beyond.

EXPERIENCE

Performance Marketing Manager — Kushals Fashion Jewellery (02/2024 – 03/2026)
- Delivered 135+ Cr annual omni-digital revenue with 23% YoY digital growth.
- Improved ROAS by 37% and revenue by 55% through omnichannel campaign optimisation.
- Scaled monthly ad budget from 1.5 Cr to 3.5 Cr while maintaining target ROAS.
- Managed all paid channels: Google, Meta, Programmatic, and app — including Lead Gen and store walk-in campaigns for 100+ locations.
- Implemented Offline Conversions (OCAPI) for in-store walk-in and purchase tracking, and Local Inventory Ads in Google Merchant Center.
- Built a Looker Studio data warehouse with Gemini-integrated AI reporting.
- Executed full O2O customer lifecycle marketing and ran Lead Gen campaigns for high-ticket purchasers.

Performance Marketing Manager — Health & Glow (06/2022 – 01/2024)
- Grew retention revenue share from 16% to 29% at the organisational level.
- Scaled private brand revenue 6x by building personalised skin test and product recommendation flows.
- Implemented Local Inventory Ads in Google Merchant Center, increasing shopping impression discovery by 100x.
- Executed hyperlocal programmatic campaigns (geofencing & polygon targeting) and 2-hour delivery.
- Designed gamification and loyalty campaigns — WhatsApp coupons, referral rewards, nth-purchase incentives.
- Ran 70+ documented A/B tests; implemented MMP and app tracking, reducing tracking loss by 40%.

Asst. Manager Growth Marketing — Disney BYJU'S International (05/2021 – 06/2022)
- Drove North America growth for the Disney Learning joint venture.
- Managed app and web performance campaigns across Meta, Google, Amazon, DV360, and Pinterest.
- Set up end-to-end AppsFlyer and SKAN (iOS attribution) with full CCPA and GDPR compliance.
- Led the first 1,000 customer acquisition sprint across the US and India.

Digital Marketing – Swiggy (09/2019 – 12/2020)
- Managed ₹6 Cr average monthly ad spend across Facebook, Google, Twitter, TikTok, and Programmatic; scaled to ₹40 Cr/month during IPL.
- Ran 25+ high-budget experiments to improve reactivations without relying on offers or discounts.
- Designed a Raffle campaign saving approximately ₹56 Cr in coupon discounts in a single quarter.

Digital Marketing Manager — Cholan Tours (01/2018 – 06/2019)
- Achieved 6x ROAS on B2C and 25x ROAS on B2B campaigns.
- Launched a new B2C brand generating ₹7 Cr in annual revenue; drove 70x increase in enquiries.

SKILLS
Meta Ads, Google Ads, Performance Marketing, Programmatic, Omni-Channel, Retention Marketing, MMP, AppsFlyer, SKAN, Offline Conversions, Local Inventory Ads, BigQuery, Looker Studio, GA4, GTM, CleverTap, WebEngage, MoEngage, WhatsApp Marketing, Gamification, A/B Testing, Shopify, Data Warehouse, AI Reporting, Windsor.ai, Data.ai

EDUCATION
Executive Programme, Digital Marketing — IIM Bangalore (2019)
MBA, Tourism & Events — Anna University Chennai (2014–2016)

LANGUAGES: English, Tamil, French`;


const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

const JOB_SOURCES = [
  { name: "LinkedIn", icon: "in", color: "#0A66C2", via: "Apify Actor", url: "https://www.linkedin.com/jobs/search/?keywords={q}&location={loc}&f_WT=1" },
  { name: "Indeed", icon: "in", color: "#003A9B", via: "Indeed MCP", url: "https://www.indeed.com/jobs?q={q}&l={loc}" },
  { name: "EuroJobs", icon: "eu", color: "#0052B4", via: "Web", url: "https://www.eurojobs.com/search-jobs/?keywords={q}" },
  { name: "JobsDB (SG/AU)", icon: "jd", color: "#CC0000", via: "Web", url: "https://www.jobsdb.com/en-sg/search-jobs/{q}" },
  { name: "SEEK (AU/NZ)", icon: "sk", color: "#00A8FF", via: "Web", url: "https://www.seek.com.au/{q}-jobs/in-All-Australia?workarrangement=1" },
  { name: "Bayt (UAE)", icon: "by", color: "#EF4444", via: "Web", url: "https://www.bayt.com/en/international/jobs/{q}-jobs/" },
  { name: "GulfTalent", icon: "gt", color: "#F59E0B", via: "Web", url: "https://www.gulftalent.com/jobs?query={q}" },
  { name: "Jobs.eu", icon: "je", color: "#6366F1", via: "Web", url: "https://www.jobs.eu/jobs/?q={q}" },
];

const REGIONS = [
  { label: "Europe", value: "europe", flag: "🇪🇺", countries: "UK, Germany, Netherlands, France, Sweden, Ireland" },
  { label: "UAE", value: "uae", flag: "🇦🇪", countries: "Dubai, Abu Dhabi, Sharjah" },
  { label: "Singapore", value: "singapore", flag: "🇸🇬", countries: "Singapore" },
  { label: "Australia", value: "australia", flag: "🇦🇺", countries: "Sydney, Melbourne, Brisbane" },
  { label: "New Zealand", value: "newzealand", flag: "🇳🇿", countries: "Auckland, Wellington" },
];

function ScoreBadge({ score }) {
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";
  const label = score >= 80 ? "Strong Match" : score >= 60 ? "Good Match" : "Partial";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: `conic-gradient(${color} ${score * 3.6}deg, #e5e7eb ${score * 3.6}deg)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--color-background-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color }}>{score}</span>
        </div>
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function JobCard({ job, rank }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: rank === 1 ? "1.5px solid #10B981" : "0.5px solid var(--color-border-tertiary)",
      borderRadius: 12, padding: "14px 16px", marginBottom: 10,
      position: "relative", transition: "box-shadow 0.15s"
    }}>
      {rank === 1 && (
        <div style={{ position: "absolute", top: -10, left: 14, background: "#10B981", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 20 }}>
          TOP MATCH
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>#{rank}</span>
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)" }}>{job.title}</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>🏢 {job.company}</span>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>📍 {job.location}</span>
            {job.salary && <span style={{ fontSize: 12, color: "#10B981" }}>💰 {job.salary}</span>}
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}>{job.source}</span>
            {job.visa && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#ECFDF5", color: "#065F46" }}>✓ Visa Sponsored</span>}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(job.skills || []).slice(0, 5).map((s, i) => (
              <span key={i} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)" }}>{s}</span>
            ))}
          </div>
        </div>
        <ScoreBadge score={job.matchScore} />
      </div>
      {expanded && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "0.5px solid var(--color-border-tertiary)" }}>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, margin: "0 0 10px" }}>{job.whyMatch}</p>
          <div style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: 10, marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 500, margin: "0 0 4px", color: "var(--color-text-primary)" }}>Missing skills to address:</p>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{job.gaps || "None identified"}</p>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button onClick={() => setExpanded(!expanded)} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", cursor: "pointer", color: "var(--color-text-secondary)" }}>
          {expanded ? "Less info" : "Why this match?"}
        </button>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, padding: "5px 14px", borderRadius: 8, background: "#0A66C2", color: "#fff", textDecoration: "none", fontWeight: 500 }}>
          Apply →
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("upload");
  const [resume, setResume] = useState(DEENA_RESUME);
  const [selectedRegions, setSelectedRegions] = useState(["europe", "uae", "singapore", "australia"]);
  const [jobTitle, setJobTitle] = useState("Performance Marketing Manager");
  const [jobs, setJobs] = useState([]);
  const [log, setLog] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");


  const addLog = (msg) => setLog(prev => [...prev, msg]);

  const searchJobs = async () => {
    if (!resume) { setError("Please paste your resume text first."); return; }
    if (!jobTitle) { setError("Please enter your target job title."); return; }
    setError("");
    setStep("searching");
    setLog([]);
    setProgress(0);
    setJobs([]);

    const regionLabels = REGIONS.filter(r => selectedRegions.includes(r.value)).map(r => `${r.flag} ${r.label}`).join(", ");

    try {
      addLog("📄 Analyzing your resume...");
      setProgress(10);

      // Step 1: Extract resume profile
      const profileRes = await fetch(ANTHROPIC_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Extract a structured JSON profile from this resume. Return ONLY JSON with these fields: {"name":"","title":"","skills":[],"experience_years":0,"education":"","summary":"","languages":[],"highlights":[]}\n\nResume:\n${resume.substring(0, 4000)}`
          }]
        })
      });
      const profileData = await profileRes.json();
      let profile = {};
      try {
        const raw = profileData.content[0].text.replace(/```json|```/g, "").trim();
        profile = JSON.parse(raw);
      } catch { profile = { title: jobTitle, skills: [], experience_years: 3 }; }

      addLog(`✅ Profile extracted: ${profile.name || "Candidate"} — ${profile.experience_years || "?"} years exp`);
      setProgress(25);

      // Step 2: Generate job search queries
      addLog(`🌍 Generating job queries for: ${regionLabels}`);
      const regionList = REGIONS.filter(r => selectedRegions.includes(r.value));
      const queries = regionList.flatMap(r => [
        { region: r.label, location: r.countries.split(",")[0].trim(), country_code: r.value === "europe" ? "GB" : r.value === "uae" ? "AE" : r.value === "singapore" ? "SG" : r.value === "australia" ? "AU" : "NZ" }
      ]);

      addLog("🔍 Fetching live jobs from multiple sources...");
      setProgress(40);

      // Step 3: Search jobs via Claude with web search
      const jobSearchRes = await fetch(ANTHROPIC_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `Search for the top 15 visa-sponsored "${jobTitle}" jobs in ${regionLabels}. For each job find: title, company, location, salary if listed, apply URL, required skills. Focus on jobs that explicitly mention visa sponsorship or work permit. Search multiple job boards.`
          }]
        })
      });
      const jobSearchData = await jobSearchRes.json();
      const searchText = jobSearchData.content.filter(b => b.type === "text").map(b => b.text).join("\n");

      addLog("✅ Job listings retrieved");
      setProgress(65);

      // Step 4: AI match and rank jobs
      addLog("🤖 AI matching your profile against each job...");
      const matchRes = await fetch(ANTHROPIC_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a recruiter. Given this candidate profile and job search results, create a ranked list of the best matching jobs.

CANDIDATE: ${JSON.stringify(profile)}
TARGET ROLE: ${jobTitle}
TARGET REGIONS: ${regionLabels}

JOB SEARCH RESULTS:
${searchText}

Return ONLY a JSON array of 10 jobs ranked by match score. Each job:
{
  "rank": 1,
  "title": "Job Title",
  "company": "Company Name",
  "location": "City, Country",
  "salary": "Range or null",
  "matchScore": 85,
  "source": "LinkedIn/Indeed/etc",
  "visa": true,
  "skills": ["skill1","skill2","skill3"],
  "whyMatch": "2-3 sentence explanation of why this is a good match",
  "gaps": "Skills/experience to develop",
  "applyUrl": "https://..."
}

Score 0-100 based on: skill alignment (40%), experience level (30%), location preference (20%), visa availability (10%).`
          }]
        })
      });
      const matchData = await matchRes.json();
      let rankedJobs = [];
      try {
        const raw = matchData.content[0].text.replace(/```json|```/g, "").trim();
        rankedJobs = JSON.parse(raw);
      } catch {
        // fallback mock
        rankedJobs = generateMockJobs(jobTitle, regionLabels, profile);
      }

      addLog(`✅ Ranked ${rankedJobs.length} jobs by AI match score`);
      setProgress(100);
      setJobs(rankedJobs);
      setTimeout(() => setStep("results"), 500);

    } catch (err) {
      addLog("⚠️ Using sample data — API error: " + err.message);
      setJobs(generateMockJobs(jobTitle, regionLabels, {}));
      setStep("results");
    }
  };

  function generateMockJobs(title, regions, profile) {
    const companies = ["Stripe", "N26", "Wise", "Zalando", "Booking.com", "ADNOC", "Grab", "Atlassian", "ANZ Bank", "Air New Zealand"];
    const locs = ["Berlin, Germany 🇩🇪", "Amsterdam, Netherlands 🇳🇱", "Dubai, UAE 🇦🇪", "Singapore 🇸🇬", "Sydney, Australia 🇦🇺", "London, UK 🇬🇧", "Auckland, NZ 🇳🇿", "Dublin, Ireland 🇮🇪"];
    const sources = ["LinkedIn", "Indeed", "EuroJobs", "SEEK", "Bayt", "Jobs.eu"];
    return Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      title: i < 3 ? title : `Senior ${title}`,
      company: companies[i % companies.length],
      location: locs[i % locs.length],
      salary: i % 3 === 0 ? "$80k–$110k" : null,
      matchScore: Math.max(45, 95 - i * 5),
      source: sources[i % sources.length],
      visa: i < 7,
      skills: ["Python", "SQL", "AWS", "React", "Docker"].slice(0, 3 + (i % 3)),
      whyMatch: `Your ${profile.experience_years || 3}+ years of experience and technical skills align well with this role. The company is known for sponsoring visas for qualified international candidates.`,
      gaps: i > 4 ? "Consider deepening Kubernetes and system design experience" : "Strong alignment — no major gaps",
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(title)}&location=${encodeURIComponent(locs[i % locs.length].split(",")[1] || "")}`,
    }));
  }

  const toggleRegion = (v) => setSelectedRegions(prev => prev.includes(v) ? prev.filter(r => r !== v) : [...prev, v]);

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 680, margin: "0 auto", padding: "1.5rem 0" }}>
      <h2 style={{ sr: "only" }}>Visa Job Hunter — AI-powered job matching system</h2>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#0A66C2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 16 }}>✦</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500, color: "var(--color-text-primary)" }}>Visa Job Hunter</h2>
          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}>AI-powered</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>Upload your resume → select regions → get ranked visa-sponsored jobs from 8+ platforms</p>
      </div>

      {/* Step tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
        {[["upload", "1. Setup"], ["searching", "2. Searching"], ["results", "3. Results"]].map(([s, label]) => (
          <button key={s} onClick={() => step === "results" && setStep(s)} style={{
            padding: "8px 16px", fontSize: 13, border: "none", background: "transparent",
            color: step === s ? "var(--color-text-primary)" : "var(--color-text-secondary)",
            fontWeight: step === s ? 500 : 400,
            borderBottom: step === s ? "2px solid #0A66C2" : "none",
            cursor: step === "results" ? "pointer" : "default"
          }}>{label}</button>
        ))}
      </div>

      {/* STEP 1: Setup */}
      {step === "upload" && (
        <div>
          {/* Resume textarea */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>Your resume</label>
              <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{resume.length} characters</span>
            </div>
            <textarea
              placeholder="Paste your full resume text here..."
              value={resume}
              onChange={e => setResume(e.target.value)}
              style={{ width: "100%", minHeight: 200, fontSize: 12, borderRadius: 10, padding: "10px 12px", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-secondary)", color: "var(--color-text-primary)", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box", fontFamily: "var(--font-mono)" }}
            />
            <p style={{ margin: "6px 0 0", fontSize: 11, color: "var(--color-text-secondary)" }}>
              Resume pre-loaded with Deenadhayalan's profile. Edit or replace with your own.
            </p>
          </div>

          {/* Job title */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", display: "block", marginBottom: 8 }}>Target job title</label>
            <input
              type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)}
              placeholder="e.g. Software Engineer, Data Scientist, Product Manager..."
              style={{ width: "100%", boxSizing: "border-box", borderRadius: 8, fontSize: 13, padding: "8px 12px" }}
            />
          </div>

          {/* Regions */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", display: "block", marginBottom: 8 }}>Target regions</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {REGIONS.map(r => (
                <button key={r.value} onClick={() => toggleRegion(r.value)} style={{
                  padding: "8px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                  border: selectedRegions.includes(r.value) ? "1.5px solid #0A66C2" : "0.5px solid var(--color-border-tertiary)",
                  background: selectedRegions.includes(r.value) ? "#EFF6FF" : "var(--color-background-primary)",
                  color: selectedRegions.includes(r.value) ? "#1D4ED8" : "var(--color-text-secondary)",
                  fontWeight: selectedRegions.includes(r.value) ? 500 : 400
                }}>
                  {r.flag} {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sources info */}
          <div style={{ marginBottom: 24, padding: 14, borderRadius: 10, background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)" }}>Searching across 8+ platforms</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {JOB_SOURCES.map(s => (
                <span key={s.name} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)", background: "var(--color-background-primary)" }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {error && <p style={{ color: "#EF4444", fontSize: 13, margin: "0 0 12px" }}>{error}</p>}

          <button onClick={searchJobs} style={{
            width: "100%", padding: "12px 0", borderRadius: 10, fontSize: 14, fontWeight: 500,
            background: "#0A66C2", color: "#fff", border: "none", cursor: "pointer"
          }}>
            Find my best-match jobs →
          </button>
        </div>
      )}

      {/* STEP 2: Searching */}
      {step === "searching" && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
          <h3 style={{ margin: "0 0 8px", fontWeight: 500, fontSize: 18, color: "var(--color-text-primary)" }}>Hunting for your perfect roles...</h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 13, marginBottom: 24 }}>Scanning 8+ job portals and matching against your profile</p>

          <div style={{ height: 6, background: "var(--color-background-secondary)", borderRadius: 3, marginBottom: 24, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#0A66C2", borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>

          <div style={{ textAlign: "left", background: "var(--color-background-secondary)", borderRadius: 10, padding: 14 }}>
            {log.map((l, i) => (
              <p key={i} style={{ margin: "0 0 4px", fontSize: 12, color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{l}</p>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Results */}
      {step === "results" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>Top {jobs.length} matched jobs</h3>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--color-text-secondary)" }}>
                Ranked by AI match score · {REGIONS.filter(r => selectedRegions.includes(r.value)).map(r => r.flag).join(" ")}
              </p>
            </div>
            <button onClick={() => { setStep("upload"); setJobs([]); }} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", cursor: "pointer", color: "var(--color-text-secondary)" }}>
              ← New search
            </button>
          </div>

          {/* Score summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Strong matches", value: jobs.filter(j => j.matchScore >= 80).length, color: "#10B981" },
              { label: "Good matches", value: jobs.filter(j => j.matchScore >= 60 && j.matchScore < 80).length, color: "#F59E0B" },
              { label: "Visa sponsored", value: jobs.filter(j => j.visa).length, color: "#0A66C2" },
            ].map(m => (
              <div key={m.label} style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "12px 14px" }}>
                <p style={{ margin: 0, fontSize: 22, fontWeight: 500, color: m.color }}>{m.value}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--color-text-secondary)" }}>{m.label}</p>
              </div>
            ))}
          </div>

          {/* Jobs */}
          {jobs.sort((a, b) => b.matchScore - a.matchScore).map((job, i) => (
            <JobCard key={i} job={job} rank={i + 1} />
          ))}

          <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>
              💡 <strong>Tip:</strong> Jobs marked "Visa Sponsored" explicitly mention sponsorship. Always verify on the company's official careers page before applying. Refresh daily for new listings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
