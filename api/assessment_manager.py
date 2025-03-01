# api/assessment_manager.py
import json
from typing import Dict, Union

class AssessmentManager:
    def __init__(self):
        # Embed scoring_system directly (remove file loading)
        self.scoring_system = {
            {
  "question1": {
    "a": {"Logical Thinking": 3, "Analytical Abilities": 3, "Interest in Specific Subjects": 2},
    "b": {"Logical Thinking": 2, "Analytical Abilities": 3, "Interest in Specific Subjects": 2},
    "c": {"Verbal Skills": 3, "Interest in Specific Subjects": 2, "Creative Thinking": 1},
    "d": {"Verbal Skills": 2, "Interest in Specific Subjects": 2},
    "e": {"Creative Thinking": 3, "Interest in Specific Subjects": 2, "Spatial Reasoning": 2},
    "f": {"Interest in Specific Subjects": 0}
  },
  "question2": {
    "a": {"Learning Speed": 3, "Analytical Abilities": 2},
    "b": {"Learning Speed": 2, "Analytical Abilities": 1},
    "c": {"Learning Speed": 1},
    "d": {"Learning Speed": 0}
  },
  "question3": {
    "a": {"Problem-solving Abilities": 3, "Logical Thinking": 3, "Critical Thinking": 2},
    "b": {"Problem-solving Abilities": 2, "Logical Thinking": 1, "Critical Thinking": 3},
    "c": {"Problem-solving Abilities": 1, "People Skills": 1},
    "d": {"Problem-solving Abilities": 0, "Critical Thinking": 1}
  },
  "question4": {
    "a": {"Learning Speed": 1, "Verbal Skills": 2, "Critical Thinking": 2},
    "b": {"Learning Speed": 2, "Visual Skills": 2},
    "c": {"Learning Speed": 2, "People Skills": 3},
    "d": {"Learning Speed": 3, "Nature Smartness": 3},
    "e": {"Learning Speed": 2, "Critical Thinking": 3, "Logical Thinking": 2},
    "f": {"Learning Speed": 2, "Spatial Reasoning": 3}
  },
  "question5": {
    "a": {"Grade Trends": 3, "Work Ethic": 3},
    "b": {"Grade Trends": 2, "Work Ethic": 2},
    "c": {"Grade Trends": 1, "Work Ethic": 1},
    "d": {"Grade Trends": 0, "Work Ethic": 0}
  },
  "question7": {
    "a": {"Work Ethic": 2, "Learning Speed": 1},
    "b": {"People Skills": 2, "Critical Thinking": 2},
    "c": {"Work Ethic": 3, "Critical Thinking": 3, "Problem Solving": 2},
    "d": {"Work Ethic": 2, "Independence": 2}
  },
  "question8": {
    "a": {"Learning Speed": 2, "People Skills": 2},
    "b": {"Learning Speed": 2, "Independence": 2},
    "c": {"Learning Speed": 1, "Spatial Reasoning": 1},
    "d": {"Learning Speed": 3, "Risk Taking": 2}
  },
  "question9": {
    "a": {"Sports Participation": 3, "People Skills": 2, "Teamwork": 3, "Physical Activity": 3},
    "b": {"Sports Participation": 3, "People Skills": 2, "Teamwork": 3, "Physical Activity": 3},
    "c": {"Sports Participation": 3, "Teamwork": 3, "Physical Activity": 3},
    "d": {"Sports Participation": 3, "Physical Activity": 3},
    "e": {"Sports Participation": 3, "Physical Activity": 3},
    "f": {"Sports Participation": 2, "Physical Activity": 2},
    "g": {"Sports Participation": 0}
  },
  "question11": {
    "a": {"Clubs/Interest Groups": 3, "Technological Affinity": 3, "Logical Thinking": 2},
    "b": {"Clubs/Interest Groups": 3, "Verbal Skills": 3, "Critical Thinking": 2, "People Skills": 2},
    "c": {"Clubs/Interest Groups": 3, "Creative Thinking": 3, "People Skills": 2},
    "d": {"Clubs/Interest Groups": 3, "Creative Thinking": 3, "Spatial Reasoning": 2},
    "e": {"Clubs/Interest Groups": 3, "People Skills": 3, "Social Engagement": 3},
    "f": {"Clubs/Interest Groups": 3, "Verbal Skills": 3, "Critical Thinking": 2},
    "g": {"Clubs/Interest Groups": 2},
    "h": {"Clubs/Interest Groups": 0}
  },
  "question14": {
    "a": {"Creative Thinking": 3, "Spatial Reasoning": 3, "Picture Smartness": 3},
    "b": {"Creative Thinking": 3, "Spatial Reasoning": 2, "Music Smartness": 3},
    "c": {"Creative Thinking": 3, "Verbal Skills": 3},
    "d": {"Creative Thinking": 3, "People Skills": 3},
    "e": {"Creative Thinking": 3, "Technological Affinity": 2, "Spatial Reasoning": 2},
    "f": {"Creative Thinking": 0}
  },
  "question15": {
    "a": {"Leadership Roles": 2, "Work Ethic": 2},
    "b": {"Leadership Roles": 1, "Work Ethic": 1},
    "c": {"Leadership Roles": 0, "Work Ethic": 0}
  },
  "question16": {
    "a": {"Physical Activity": 3},
    "b": {"Passive Activity": 1},
    "c": {"Technological Affinity": 2, "Picture Smartness": 2, "Nature Smartness": 0},
    "d": {"Verbal Skills": 2, "Critical Thinking": 2},
    "e": {"People Skills": 3},
    "f": {"Passive Activity": 0}
  },
  "question17": {
    "a": {"Independence": 3, "People Skills": 0, "Teamwork": 0},
    "b": {"Independence": 2, "People Skills": 1, "Teamwork": 1},
    "c": {"Independence": 2, "People Skills": 2, "Teamwork": 2},
    "d": {"Independence": 1, "People Skills": 3, "Teamwork": 3},
    "e": {"Independence": 0, "People Skills": 3, "Teamwork": 3}
  },
  "question18": {
    "a": {"Risk-taking": 3},
    "b": {"Risk-taking": 2},
    "c": {"Risk-taking": 1},
    "d": {"Risk-taking": 0}
  },
  "question19": {
    "a": {"Communication Skills": 3, "Creative Thinking": 2},
    "b": {"Independence": 3},
    "c": {"People Skills": 3, "Communication Skills": 3},
    "d": {"People Skills": 2, "Teamwork": 2, "Work Ethic": 2},
    "e": {"Teamwork": 3, "Adaptability": 3}
  },
  "question20": {
    "a": {"Work Ethic": 3, "Planning": 3, "Discipline": 3},
    "b": {"Work Ethic": 2, "Planning": 2, "Discipline": 2},
    "c": {"Work Ethic": 1, "Planning": 1, "Discipline": 1},
    "d": {"Work Ethic": 0, "Planning": 0, "Discipline": 0}
  },
  "question21": {
    "a": {"Risk Taking": 3, "Decisiveness": 3},
    "b": {"Critical Thinking": 3, "Planning": 3, "Decisiveness": 2},
    "c": {"People Skills": 3, "Decisiveness": 1},
    "d": {"Decisiveness": 0}
  },
  "question22": {
    "a": {"Work Ethic": 3, "Planning": 3, "Discipline": 3},
    "b": {"Work Ethic": 2, "Planning": 2, "Discipline": 2},
    "c": {"Work Ethic": 1, "Planning": 1, "Discipline": 1},
    "d": {"Work Ethic": 0, "Planning": 0, "Discipline": 0}
  },
  "question23": {
    "a": {"Adaptability": 3, "Resilience": 3},
    "b": {"Adaptability": 2, "Resilience": 2},
    "c": {"People Skills": 3, "Adaptability": 1, "Resilience": 1},
    "d": {"Adaptability": 0, "Resilience": 0}
  },
  "question24": {
    "a": {"People Skills": 3, "Empathy": 3},
    "b": {"People Skills": 2, "Empathy": 2},
    "c": {"People Skills": 0, "Empathy": 0}
  },
  "question25": {
    "a": {"Resilience": 3, "Learning Speed": 3},
    "b": {"Resilience": 1},
    "c": {"People Skills": 2},
    "d": {"Resilience": 0}
  },
  "question26": {
    "a": {"Career Interest Surveys": 3, "People Skills": 3, "Logic": 2},
    "b": {"Career Interest Surveys": 3, "Logical Thinking": 3, "Nature Smartness": 2},
    "c": {"Career Interest Surveys": 3, "Technological Affinity": 3, "Logical Thinking": 3},
    "d": {"Career Interest Surveys": 3, "Logical Thinking": 3, "People Skills": 2},
    "e": {"Career Interest Surveys": 3, "Creative Thinking": 3, "Spatial Reasoning": 3},
    "f": {"Career Interest Surveys": 3, "Verbal Skills": 3, "Logical Thinking": 2, "People Skills": 2},
    "g": {"Career Interest Surveys": 3, "Verbal Skills": 3, "People Skills": 3},
    "h": {"Career Interest Surveys": 3, "Logical Thinking": 3, "Nature Smartness": 3},
    "i": {"Career Interest Surveys": 0}
  },
  "question28": {
    "a": {"Comfort with Technology": 3, "Technological Affinity": 3},
    "b": {"Comfort with Technology": 2, "Technological Affinity": 2},
    "c": {"Comfort with Technology": 1, "Technological Affinity": 1},
    "d": {"Comfort with Technology": 0, "Technological Affinity": 0}
  },
  "question29": {
    "a": {"Technological Affinity": 3, "Logical Thinking": 3},
    "b": {"Technological Affinity": 3, "Creative Thinking": 2},
    "c": {"Technological Affinity": 3, "Creative Thinking": 3, "Spatial Reasoning": 3},
    "d": {"Technological Affinity": 3, "Logical Thinking": 3, "Analytical Abilities": 3},
    "e": {"Technological Affinity": 3, "Spatial Reasoning": 2, "Creative Thinking": 3},
    "f": {"Technological Affinity": 3, "Logical Thinking": 3, "Spatial Reasoning": 3},
    "g": {"Technological Affinity": 2, "Logical Thinking": 2},
    "h": {"Technological Affinity": 3, "Logical Thinking": 3},
    "i": {"Technological Affinity": 0}
  },
  "question31": {
    "a": {"Learning Speed": 3, "Technological Affinity": 3},
    "b": {"Learning Speed": 2, "Technological Affinity": 2},
    "c": {"Learning Speed": 1, "Technological Affinity": 1},
    "d": {"Learning Speed": 0, "Technological Affinity": 0}
  },
  "question33": {
    "a": {"Logical Thinking": 3, "Problem-solving Abilities": 3},
    "b": {"Logical Thinking": 2, "Problem-solving Abilities": 2},
    "c": {"Logical Thinking": 1, "Problem-solving Abilities": 1},
    "d": {"Logical Thinking": 0, "Problem-solving Abilities": 0}
  },
  "question34": {
    "a": {"Analytical Abilities": 3, "Logical Thinking": 3},
    "b": {"Analytical Abilities": 2, "Logical Thinking": 2},
    "c": {"Analytical Abilities": 1, "Logical Thinking": 1},
    "d": {"Analytical Abilities": 0, "Logical Thinking": 0}
  },
  "question35": {
    "a": {"Memory Smartness": 3},
    "b": {"Memory Smartness": 2},
    "c": {"Memory Smartness": 1},
    "d": {"Memory Smartness": 0}
  },
  "question36": {
    "a": {"Critical Thinking": 0},
    "b": {"Critical Thinking": 3, "Risk Taking": 2},
    "c": {"Critical Thinking": 0},
    "d": {"People Skills": 1}
  },
  "question37": {
    "a": {"People Skills": 3},
    "b": {"People Skills": 2},
    "c": {"People Skills": 1},
    "d": {"People Skills": 0}
  },
  "question38": {
    "a": {"Teamwork": 3, "People Skills": 3},
    "b": {"Teamwork": 2, "People Skills": 2},
    "c": {"Teamwork": 1, "People Skills": 1},
    "d": {"Teamwork": 0, "People Skills": 0}
  },
    "question39": {
      "a": {"People Skills": 3, "Empathy": 2},
      "b": {"People Skills": 2, "Empathy": 2},
      "c": {"People Skills": 1, "Empathy": 1}, 
      "d": {"People Skills": 0, "Empathy": 0}
    },
    "question40": {
      "a": {"Communication Skills": 3, "People Skills": 3},
      "b": {"Communication Skills": 2, "People Skills": 2},
      "c": {"Communication Skills": 1, "People Skills": 1},
      "d": {"Communication Skills": 0, "People Skills": 0}
    },
    "question41": {
      "a": {"Independence": 3, "People Skills": 0, "Teamwork": 0},
      "b": {"Independence": 2, "People Skills": 1, "Teamwork": 1},
      "c": {"Independence": 2, "People Skills": 2, "Teamwork": 2}, 
      "d": {"Independence": 1, "People Skills": 3, "Teamwork": 3},
      "e": {"Independence": 0, "People Skills": 3, "Teamwork": 3}
    },
    "question42": {
      "a": {"Work Ethic": 3},
      "b": {"Work Ethic": 2, "Critical Thinking": 2},
      "c": {"Work Ethic": 1, "Critical Thinking": 3}
    },
    "question43": {
      "a": {"Planning": 3, "Work Ethic": 3},
      "b": {"Planning": 2, "Work Ethic": 2},
      "c": {"Planning": 0, "Work Ethic": 1}
    },
    "question44": {
      "a": {"Work Ethic": 3, "Discipline": 3, "Learning Speed": 3},
      "b": {"Work Ethic": 2, "Discipline": 2, "Learning Speed": 2},
      "c": {"Work Ethic": 1, "Discipline": 1, "Learning Speed": 1},
      "d": {"Work Ethic": 0, "Discipline": 0, "Learning Speed": 0}
    },
    "question45": {
      "a": {"Communication Skills": 3, "People Skills": 3},
      "b": {"Communication Skills": 1, "People Skills": 3},
      "c": {"Communication Skills": 2, "People Skills": 2},
      "d": {"Communication Skills": 0, "People Skills": 0}
    }
   }
            
            # Add the remaining questions from your scoring_system.json here (e.g., question4, question5, etc.)
            # For brevity, I’ve included only the first three questions—extend this to include all entries from your JSON file.
 }
        self.trait_scores = {
             'Logical Thinking': 0,
            'Analytical Abilities': 0,
            'Verbal Skills': 0,
            'Creative Thinking': 0,
            'Learning Speed': 0,
            'Problem-solving Abilities': 0,
            'Critical Thinking': 0,
            'Spatial Reasoning': 0,
            'People Skills': 0,
            'Sports Participation': 0,
            'Physical Activity': 0,
            'Leadership Roles': 0,
            'Teamwork': 0,
            'Clubs/Interest Groups': 0,
            'Technological Affinity': 0,
            'Social Engagement': 0,
            'Volunteering and Social Engagement': 0,
            'Social Responsibility': 0,
            'Awards and Recognitions': 0,
            'Online Certifications': 0,
            'Competitions/Olympiads': 0,
            'Independence': 0,
            'Risk-taking': 0,
            'Communication Skills': 0,
            'Work Ethic': 0,
            'Planning': 0,
            'Discipline': 0,
            'Career Interest Surveys': 0,
            'Digital Footprint': 0,
            'Online Presence': 0,
            'Nature Smartness': 0,
            'Picture Smartness': 0,
            'Music Smartness': 0,
            'Memory Smartness': 0,
            'Adaptability': 0,
            'Resilience': 0,
            'Empathy': 0,
            'Decisiveness': 0,
            'Passive Activity': 0,
            'Grade Trends': 0,
            'Interest in Specific Subjects': 0,
            'Technical Skills': 0,
            'Attention to Detail': 0,
            'Creativity': 0,
            'Artistic Skills': 0,
            'Social Awareness': 0,
            'Leadership': 0,
            'Decision Making': 0,
            'Collaboration': 0,
            'Self-reliance': 0,
            'Math Skills': 0,
            'Writing Skills': 0,
            'Physical Skills': 0,
            'Hand-eye Coordination': 0,
            'Stability Seeking': 0,
            'Financial Management': 0,
            'Solitary Work': 0,
            'Sustainability': 0,
            'Logic': 0,
            'Curiosity': 0,
            'Financial Literacy': 0,
            'Conventional Thinking': 0,
            'Independent Thinking': 0,
            'Science and Research': 0,
            'Public Speaking': 0,
            'Networking': 0,
            'Aesthetic Sense': 0,
            'Market Dynamics': 0,
            'Economics': 0,
            'Artistic Expression': 0,
            'Creative Freedom': 0,
            'Emotional Intelligence': 0,
            'Negotiation': 0,
            'Humanitarian Work': 0,
            'Research Skills': 0,
            'Business Acumen': 0,
            'Service Orientation': 0,
            'Written Communication': 0,
            'Physical Endurance': 0,
            'Machine Learning': 0,
            'Designing': 0,
            'Comfort with Technology': 0,
            'Social Interaction': 0,
            'Confidence': 0,
            'Creative Problem Solving': 0,
            'Future-Oriented Thinking': 0,
            'Listening Skills': 0,
            'Crisis Management': 0,
            'People Management': 0,
            'Arts and Humanities': 0,
            'Athletic Ability': 0,
            'Data Analysis': 0,
            'Mental Stamina': 0,
            'Engineering': 0,
            'Scientific Research': 0,
            'Customer Relations': 0,
            'Human Behavior Analysis': 0,
            'Public Relations': 0,
            'Budgeting Skills': 0,
            'Interpersonal Skills': 0,
            'Innovation': 0,
            'Writing': 0,
            'Entrepreneurial Spirit': 0,
            'Social Skills': 0,
            'Environmental Science': 0,
            'Tradition': 0,
            'Risk Taking': 0,
            'Coding': 0,
            'Technical Accuracy': 0,
            'Precision': 0,
            'Persuasion': 0,
            'Market Analysis': 0,
            'Psychology': 0,
            'Artificial Intelligence': 0,
            'Experimental Thinking': 0,
            'Business': 0,
            'Entrepreneurship': 0,
            'Long-term Planning': 0,
            'Compassion': 0,
            'Big Picture Thinking': 0,
            'Visionary Thinking': 0,
            'Visual Skills': 0,
            'Problem Solving': 0
            # Add other traits as needed from your scoring_system.json
        }
        self._validate_scoring_system()

    def _validate_scoring_system(self):
        """Validate that all traits in scoring system exist in trait_scores."""
        missing_traits = set()
        for question, choices in self.scoring_system.items():
            for choice, traits in choices.items():
                for trait in traits:
                    if trait not in self.trait_scores:
                        missing_traits.add(trait)
        if missing_traits:
            raise ValueError(f"Scoring system contains undefined traits: {missing_traits}")

    def calculate_scores(self, answers: Dict[str, Union[str, List[str]]]) -> Dict[str, float]:
        """Calculate trait scores based on questionnaire answers."""
        try:
            # Reset scores
            for trait in self.trait_scores:
                self.trait_scores[trait] = 0
                
            # Process each answer
            for question_id, answer in answers.items():
                # Skip questions that aren't meant for scoring
                if question_id in ['question27', 'question30', 'question32', 'question46', 
                                'question47', 'question48', 'question49', 'question50']:
                    continue
                    
                if question_id not in self.scoring_system:
                    continue
                    
                # Handle multiple choice answers
                if isinstance(answer, list):
                    for choice in answer:
                        if choice in self.scoring_system[question_id]:
                            self._add_trait_scores(self.scoring_system[question_id][choice])
                # Handle single choice answers
                elif answer in self.scoring_system[question_id]:
                    self._add_trait_scores(self.scoring_system[question_id][answer])
            
            # Normalize scores
            return self._normalize_scores()
            
        except Exception as e:
            raise Exception(f"Score calculation failed: {str(e)}")

    def _add_trait_scores(self, trait_values: Dict[str, int]):
        """Add trait scores from a single answer choice."""
        for trait, value in trait_values.items():
            if trait in self.trait_scores:
                self.trait_scores[trait] += value
            else:
                raise ValueError(f"Ignoring unknown trait: {trait}")

    def _normalize_scores(self) -> Dict[str, float]:
        """Normalize trait scores to 0-100 range."""
        max_possible = {trait: 0 for trait in self.trait_scores}
        
        # Calculate maximum possible score for each trait
        for question in self.scoring_system.values():
            for choice in question.values():
                for trait, value in choice.items():
                    if trait in max_possible:
                        max_possible[trait] = max(max_possible[trait], value)
        
        # Normalize scores
        normalized = {}
        for trait, score in self.trait_scores.items():
            if max_possible[trait] > 0:
                normalized[trait] = round((score / max_possible[trait]) * 100, 2)
            else:
                normalized[trait] = 0.0
                
        return normalized

    def get_career_prediction_prompt(self, trait_scores: Dict[str, float], student_info: Dict) -> str:
        """Generate prompt for career prediction based on trait scores."""
        return f"""Based on the following comprehensive assessment of {student_info.get('name', 'the student')}:

Trait Scores Analysis:
{json.dumps(trait_scores, indent=2)}

Student Profile:
- Age: {student_info.get('age', 'Not provided')}
- Academic Background: {student_info.get('academic_info', 'Not provided')}
- Interests: {student_info.get('interests', 'Not provided')}
- Notable Achievements: {student_info.get('achievements', 'Not provided')}

Please provide a detailed career analysis including:
1. Top 5 recommended career paths based on the trait scores
2. Required skills and development roadmap for each career
3. Educational requirements and recommended certifications
4. Industry growth prospects and future outlook
5. Potential challenges and strategies to overcome them

Format the response in clear sections with detailed explanations for each recommendation."""