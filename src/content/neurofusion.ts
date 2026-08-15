export const neurofusionCaseStudy = {
    title: "NeuroFusion AI",
    subtitle: "Multi-Modal Parkinson's Screening System",
    status: "Final Year Project · Built end-to-end from scratch",
    overview:
        "A machine-learning system that screens for Parkinson's disease by fusing signals across multiple behavioral and physiological modalities. Every model is trained under subject-grouped / nested cross-validation with probability calibration and honest, leakage-audited reporting.",
    problem:
        "Many AI approaches focus on a single modality (voice, gait, handwriting), which can perform well in isolation but fail to capture the full complexity and variability of Parkinson's. Because symptoms manifest differently across individuals, relying on a single source reduces robustness and generalizability.",
    solution:
        "NeuroFusion combines complementary modalities to provide a comprehensive representation of disease characteristics. The system does not replace neurologists; it serves as an AI-assisted screening tool to support earlier identification for further clinical evaluation.",

    /** Shown next to every metric on the page. Scientific honesty is the point. */
    metricsNote:
        "Figures are approximate AUC values from subject-grouped / nested cross-validation on the named public dataset, with probability calibration. They describe screening performance on those datasets — not clinical accuracy, and not a diagnosis.",

    engineeringRigor: [
        {
            title: "Honest Evaluation & Leakage Prevention",
            description:
                "Strict subject-grouped / nested cross-validation with probability calibration throughout. Built-in sanity assertions caught a label-inversion bug and a data-leakage confound. No metric inflation discipline.",
        },
        {
            title: "Explainability (XAI)",
            description:
                "Grad-CAM explanations on Gait models to ensure clinical interpretability. Feature importance and explanations standardized across all modalities.",
        },
        {
            title: "Module Contract Architecture",
            description:
                "A shared 'module contract' standardizes every model's output (probability, prediction, confidence, feature importance, explanation), enabling seamless composition by a learned logistic meta-learner plus an AUC-weighted-rule baseline.",
        },
    ],

    modalities: [
        {
            id: "voice",
            accent: "primary",
            name: "Voice",
            signal: "Speech",
            dataset: "Sakar 2018 (UCI)",
            dataFormat: "Speech features",
            architecture: "Stacked XGBoost + SVM ensemble with calibration",
            evaluation: "Subject-grouped CV with probability calibration",
            explainability: "Feature importance, standardised through the module contract",
            metric: "≈ 0.87",
            metricLabel: "Subject-level AUC",
        },
        {
            id: "gait",
            accent: "violet",
            name: "Gait",
            signal: "vGRF",
            dataset: "PhysioNet (Gait in PD)",
            dataFormat: "Vertical ground-reaction-force foot-sensor signals",
            architecture: "1D-CNN (PyTorch)",
            evaluation: "Subject-grouped CV with probability calibration",
            explainability: "Grad-CAM over the signal, for clinical interpretability",
            metric: "≈ 0.84",
            metricLabel: "AUC",
        },
        {
            id: "tremor",
            accent: "cyan",
            name: "Tremor",
            signal: "IMU",
            dataset: "PADS",
            dataFormat: "Smartwatch IMU data",
            architecture:
                "3-class differential (PD / differential-diagnosis / healthy) using tremor-band spectral features, rest-vs-action contrast and left–right asymmetry",
            evaluation: "Subject-grouped CV, macro-averaged across three classes",
            explainability: "Feature importance over spectral and asymmetry features",
            metric: "≈ 0.80",
            metricLabel: "Macro-AUC",
        },
        {
            id: "handwriting",
            accent: "amber",
            name: "Handwriting",
            signal: "Spiral",
            dataset: "UCI Isenkul",
            dataFormat: "Dynamic spiral drawings",
            architecture: "Scale-invariant kinematic features",
            evaluation: "Subject-grouped CV; a confound audit removed recording-length leakage",
            explainability: "Feature importance over kinematic descriptors",
            metric: "≈ 0.89",
            metricLabel: "AUC",
        },
        {
            id: "reaction",
            accent: "emerald",
            name: "Reaction Time",
            signal: "Keystroke",
            dataset: "neuroQWERTY MIT-CSXPD",
            dataFormat: "Keystroke dynamics",
            architecture: "Right-sized regularized model matching published literature benchmark",
            evaluation: "Subject-grouped CV, benchmarked against the published result",
            explainability: "Feature importance over timing features",
            metric: "≈ 0.78",
            metricLabel: "AUC",
        },
    ],

    fusion: {
        title: "Fusion Layer",
        description:
            "A learned logistic meta-learner plus an AUC-weighted-rule baseline composes the modality outputs. The system includes graceful fallback when modalities are missing.",
        contract: ["probability", "prediction", "confidence", "feature importance", "explanation"],
    },

    /** Kept for backwards compatibility with any prose usage. */
    fusionLayer:
        "A learned logistic meta-learner plus an AUC-weighted-rule baseline composes the modality outputs. The system includes graceful fallback when modalities are missing.",

    output: {
        title: "Screening Output",
        description:
            "A calibrated probability with a confidence estimate and per-modality attribution — intended to support earlier referral for clinical evaluation, not to replace it.",
    },

    stack: ["Python", "PyTorch", "XGBoost", "scikit-learn", "MobileNetV2", "1D-CNN", "FastAPI", "Flutter"],
    infrastructure: "Trained on Google Colab, developed with Claude Code in an Obsidian vault.",
    roadmap: "Roadmap extends the system to a full 8 modalities.",
};
