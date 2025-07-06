// Mock API functions - no backend required!

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock storage for demo purposes
const mockStorage = {
  recordings: new Set<string>(),
  modelTrained: false,
  inferenceActive: false,
};

export const startRecording = async (feature: string) => {
  // Simulate network delay
  await delay(200);
  
  try {
    console.log(`Mock: Starting recording for feature "${feature}"`);
    mockStorage.recordings.add(feature);
    return { 
      status: 'success', 
      message: `Recording started for ${feature}`,
      feature 
    };
  } catch (error) {
    console.error('Mock recording error:', error);
    return { status: 'error', message: 'Failed to start recording' };
  }
};

export const stopRecording = async () => {
  // Simulate network delay
  await delay(300);
  
  try {
    console.log('Mock: Stopping recording...');
    return { 
      status: 'success', 
      message: 'Recording stopped successfully' 
    };
  } catch (error) {
    console.error('Mock stop recording error:', error);
    return { status: 'error', message: 'Failed to stop recording' };
  }
};

export const trainModel = async () => {
  // Simulate longer training time
  await delay(2000);
  
  try {
    console.log('Mock: Training model...');
    mockStorage.modelTrained = true;
    return { 
      status: 'success', 
      message: 'Model trained successfully',
      accuracy: 0.95,
      features: Array.from(mockStorage.recordings)
    };
  } catch (error) {
    console.error('Mock training error:', error);
    return { status: 'error', message: 'Failed to train model' };
  }
};

export const startInference = async () => {
  // Simulate network delay
  await delay(400);
  
  try {
    console.log('Mock: Starting inference...');
    mockStorage.inferenceActive = true;
    return { 
      status: 'success', 
      message: 'Inference started successfully' 
    };
  } catch (error) {
    console.error('Mock inference error:', error);
    return { status: 'error', message: 'Failed to start inference' };
  }
};

export const stopInference = async () => {
  // Simulate network delay
  await delay(200);
  
  try {
    console.log('Mock: Stopping inference...');
    mockStorage.inferenceActive = false;
    return { 
      status: 'success', 
      message: 'Inference stopped successfully' 
    };
  } catch (error) {
    console.error('Mock stop inference error:', error);
    return { status: 'error', message: 'Failed to stop inference' };
  }
};

export const getStatus = async () => {
  // Simulate network delay
  await delay(150);
  
  try {
    const features = Array.from(mockStorage.recordings);
    console.log('Mock: Getting status...');
    
    return { 
      status: 'success',
      recording: false,
      inference: mockStorage.inferenceActive,
      model_trained: mockStorage.modelTrained,
      features_recorded: features,
      total_features: features.length,
      // Mock some predictions if inference is active
      prediction: mockStorage.inferenceActive ? {
        feature: features[Math.floor(Math.random() * features.length)] || 'none',
        confidence: Math.random() * 0.4 + 0.6, // Random confidence between 0.6-1.0
        timestamp: new Date().toISOString()
      } : null
    };
  } catch (error) {
    console.error('Mock status error:', error);
    return { status: 'error', message: 'Failed to get status' };
  }
};

// Export mock storage for debugging (optional)
export const getMockStorage = () => mockStorage;