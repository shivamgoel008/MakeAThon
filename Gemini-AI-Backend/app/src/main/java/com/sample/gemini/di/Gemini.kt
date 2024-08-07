package com.sample.gemini.di

import com.google.ai.client.generativeai.GenerativeModel
import com.sample.gemini.BuildConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
object Gemini {
    @Provides
    @GeminiProVision
    fun provideGeminiProVision(): GenerativeModel {
        return GenerativeModel(
            modelName = "gemini-pro-vision",
            apiKey = BuildConfig.apiKey
        )
    }
}