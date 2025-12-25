import { pipeline, env } from '@xenova/transformers';
import dotenv from 'dotenv';

dotenv.config();

env.allowLocalModels = false;
env.allowRemoteModels = true;
env.cacheDir = './models';

class TransformersEmbeddings {
  constructor() {
    this.model = null;
    this.modelName = process.env.EMBEDDING_MODEL || 'Xenova/all-MiniLM-L6-v2';
    this.isInitialized = false;
    this.initializationPromise = null;
    this._cachedDimension = null;
  }

  async initialize() {
    if (this.isInitialized) return;
    if (this.initializationPromise) return this.initializationPromise;
    this.initializationPromise = this._initializeModel();
    return this.initializationPromise;
  }

  async _initializeModel() {
    try {
      console.log('🚀 Initializing Transformers.js embedding model...');
      console.log(`📦 Model: ${this.modelName}`);
      this.model = await pipeline('feature-extraction', this.modelName, {
        quantized: false,
        progress_callback: (progress) => {
          if (progress.status === 'progress') {
            console.log(`📥 Downloading model: ${Math.round(progress.progress * 100)}%`);
          }
        }
      });

      this.isInitialized = true;
      console.log('✅ Transformers.js model initialized successfully!');
    } catch (error) {
      console.error('❌ Error initializing Transformers.js model:', error);
      throw new Error(`Failed to initialize embedding model: ${error.message}`);
    }
  }

  async embedDocuments(texts) {
    try {
      await this.initialize();
      const textArray = Array.isArray(texts) ? texts : [texts];
      if (textArray.length === 0) throw new Error('No texts provided for embedding');
      const embeddings = [];
      const batchSize = 8;
      for (let i = 0; i < textArray.length; i += batchSize) {
        const batch = textArray.slice(i, i + batchSize);
        const batchEmbeddings = await Promise.all(
          batch.map(async (text) => {
            try {
              const result = await this.model(text, { pooling: 'mean', normalize: true });
              return Array.from(result.data);
            } catch (error) {
              console.error(`Error embedding text: "${text.substring(0, 50)}..."`, error);
              throw new Error(`Failed to embed text: ${error.message}`);
            }
          })
        );
        embeddings.push(...batchEmbeddings);
      }
      console.log(`✅ Generated ${embeddings.length} embeddings successfully`);
      return embeddings;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw new Error(`Failed to generate embeddings: ${error.message}`);
    }
  }

  async embedQuery(text) {
    try {
      const embeddings = await this.embedDocuments([text]);
      return embeddings[0];
    } catch (error) {
      console.error('Error generating query embedding:', error);
      throw new Error(`Failed to generate query embedding: ${error.message}`);
    }
  }

  async getEmbeddingDimension() {
    try {
      await this.initialize();
      if (this._cachedDimension) return this._cachedDimension;
      const testEmbedding = await this.embedQuery('test');
      this._cachedDimension = testEmbedding.length;
      return this._cachedDimension;
    } catch (error) {
      console.error('Error getting embedding dimension:', error);
      throw new Error(`Failed to get embedding dimension: ${error.message}`);
    }
  }

  async healthCheck() {
    try {
      await this.initialize();
      const dimension = await this.getEmbeddingDimension();
      return { status: 'healthy', model: this.modelName, dimension, initialized: this.isInitialized, timestamp: new Date().toISOString() };
    } catch (error) {
      return { status: 'unhealthy', error: error.message, timestamp: new Date().toISOString() };
    }
  }

  async getServiceInfo() {
    try {
      const health = await this.healthCheck();
      return { name: 'Transformers.js Embeddings', model: this.modelName, status: health.status, dimension: health.dimension, backend: 'local', cost: 'free', rateLimit: 'none' };
    } catch (error) {
      return { name: 'Transformers.js Embeddings', model: this.modelName, status: 'error', error: error.message };
    }
  }
}

const transformersEmbeddings = new TransformersEmbeddings();

export default transformersEmbeddings;
