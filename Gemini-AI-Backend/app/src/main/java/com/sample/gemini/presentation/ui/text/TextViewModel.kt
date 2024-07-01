package com.sample.gemini.presentation.ui.text

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class TextViewModel @Inject constructor() :
    ViewModel() {

    private val _loader: MutableStateFlow<Boolean> = MutableStateFlow(false)
    val loader get() = _loader

    private val _textResponse: MutableStateFlow<String> = MutableStateFlow("")
    val textResponse get() = _textResponse

}