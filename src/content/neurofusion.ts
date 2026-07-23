export const neurofusionCaseStudy = {
    title: "NeuroFusion AI",
    subtitle: "Multi-Modal Parkinson's Screening System",
    status: "Final Year Project · Built end-to-end from scratch",
    overview: "A machine-learning system that screens for Parkinson's disease by fusing signals across multiple behavioral and physiological modalities. Every model is trained under subject-grouped / nested cross-validation with probability calibration and honest, leakage-audited reporting.",
    problem: "Many AI approaches focus on a single modality (voice, gait, handwriting), which can perform well in isolation but fail to capture the full complexity and variability of Parkinson's. Because symptoms manifest differently across individuals, relying on a single source reduces robustness and generalizability.",
    solution: "NeuroFusion combines complementary modalities to provide a comprehensive representation of disease characteristics. The system does not replace neurologists; it serves as an AI-assisted screening tool to support earlier identification for further clinical evaluation.",
    engineeringRigor: [
        {
            title: "Honest Evaluation & Leakage Prevention",
            description: "Strict subject-grouped / nested cross-validation with probability calibration throughout. Built-in sanity assertions caught a label-inversion bug and a data-leakage confound. No metric inflation discipline."
        },
        {
            title: "Explainability (XAI)",
            description: "Grad-CAM explanations on Gait models to ensure clinical interpretability. Feature importance and explanations standardized across all modalities."
        },
        {
            title: "Module Contract Architecture",
            description: "A shared 'module contract' standardizes every model's output (probability, prediction, confidence, feature importance, explanation), enabling seamless composition by a learned logistic meta-learner plus an AUC-weighted-rule baseline."
        }
    ],
    modalities: [
        {
            name: "Voice",
            dataset: "Sakar 2018 (UCI)",
            dataFormat: "Speech features",
            architecture: "Stacked XGBoost + SVM ensemble with calibration",
            metric: "Subject-level AUC ≈ 0.87"
        },
        {
            name: "Gait",
            dataset: "PhysioNet (Gait in PD)",
            dataFormat: "Vertical ground-reaction-force foot-sensor signals",
            architecture: "1D-CNN (PyTorch) with Grad-CAM explainability",
            metric: "AUC ≈ 0.84"
        },
        {
            name: "Tremor",
            dataset: "PADS",
            dataFormat: "Smartwatch IMU data",
            architecture: "3-class differential (PD/differential-diagnosis/healthy) using tremor-band spectral features, rest-vs-action contrast, and left–right asymmetry",
            metric: "Macro-AUC ≈ 0.80"
        },
        {
            name: "Handwriting",
            dataset: "UCI Isenkul",
            dataFormat: "Dynamic spiral drawings",
            architecture: "Scale-invariant kinematic features (confound audit removed recording-length leakage)",
            metric: "AUC ≈ 0.89"
        },
        {
            name: "Reaction Time",
            dataset: "neuroQWERTY MIT-CSXPD",
            dataFormat: "Keystroke dynamics",
            architecture: "Right-sized regularized model matching published literature benchmark",
            metric: "AUC ≈ 0.78"
        }
    ],
    fusionLayer: "A learned logistic meta-learner plus an AUC-weighted-rule baseline composes the modality outputs. The system includes graceful fallback when modalities are missing.",
    stack: ["Python", "PyTorch", "XGBoost", "scikit-learn", "MobileNetV2", "1D-CNN", "FastAPI", "Flutter"],
    infrastructure: "Trained on Google Colab, developed with Claude Code in an Obsidian vault.",
    roadmap: "Roadmap extends the system to a full 8 modalities."
};