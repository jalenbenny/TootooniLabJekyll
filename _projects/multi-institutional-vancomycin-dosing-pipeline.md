---
title: "Multi-Institutional Vancomycin Dosing Data Analysis and Pipeline"
status: Active
tags:
  - dosing
  - ehr
team: "Dhruvin Patel; collaborators at Loyola University Chicago, University of Illinois Chicago, University of Chicago, Mayo Clinic"
github: 
date: 2025-03-01
tools:
  - Python
  - Pandas
  - NumPy
  - EDA
  - Clinical Data Integration
summary: >
  Built a unified data pipeline integrating vancomycin dosing and lab data from five institutions (LUMC, UIC, UChicago, Mayo Clinic, MIMIC-IV) to support AUC/MIC-based precision dosing model development. Analyzed pharmacokinetic and clinical variables to identify subtherapeutic and supratherapeutic exposure patterns and their association with AKI staging.
---

Feeds directly into the [Vancomycin AUC/MIC dosing project]({{ '/research/ai-drug-dosing-critical-care/' | relative_url }}) and the [AKI staging project]({{ '/research/aki-staging-baseline-creatinine/' | relative_url }}) — this is the cross-institution data harmonization layer underneath both.
