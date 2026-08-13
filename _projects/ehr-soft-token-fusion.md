---
title: "Structured-to-LLM Soft Token Representation"
status: Active
tags:
  - llm
  - ehr
  - representation-learning
  - multimodal
  - fusion
  - nlp
team: "M. Saban, W. Yoon, T. Miller, S. Tootooni, D. Dligach"
github: ehr-soft-token-fusion
date: 2025-01-15
summary: >
  A learned projector that maps structured EHR records into soft tokens in a frozen LLM embedding space. Trains the projector to encode a structured patient record as a small set of soft tokens ingestible by an LLM, supervised with next-token loss over serialized record text.
---

**Data availability:** MIMIC-IV requires PhysioNet credentials and a data use agreement. No data in the repo, code and configs only.
