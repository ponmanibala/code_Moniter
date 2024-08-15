export const COMMON_CONSTANT = {
    "formGroupName": "adultForm",
    "adultFormControl": [
        { "controlName": 'ageGroup', "label": "Select ageGroup", "value": ['Infant', 'Child', 'Teenager', 'Young', 'Adult', 'Senior'], "matError": { "required": 'Age group is required' } },
        { "controlName": 'ageRange', "label": "Select ageRange", "value": ['0-2 years', '3-12 years', '13-19 years', '20-39years', '40-59 years', '60+ years'], "readonly": true }
    ]
}

export const COMMON_CONST = {
    "formGroupName": "caluculateForm",
    "CalculateFormControl": [
        { "controlName": 'startDate', "label": "Select start date", "type": "date", "start": "true", "matError": { "required": 'Start date is required' } },
        { "controlName": 'endDate', "label": "Select end date", "type": "date", "end": "true", "matError": { "required": 'End date is required' } },
        { "controlName": 'duration', "label": "Duration", "min": "0", "type": "number", "matError": { "required": 'Duration is required', "min": "Duration starts with 0" } }
    ]
}