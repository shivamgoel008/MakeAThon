package com.sample.gemini.presentation.ui.home

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideIn
import androidx.compose.animation.slideInHorizontally
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.sample.gemini.R
import com.sample.gemini.presentation.theme.Purple40

@Composable
@Preview(showSystemUi = true)
fun Home(navController: NavController = rememberNavController()) {
    var animate by remember {
        mutableStateOf(false)
    }

    LaunchedEffect(key1 = Unit) {
        animate = true
    }

    Box(Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(color = Color.Black)
        ) {
            Image(
                painter = painterResource(id = R.drawable.gemini_logo),
                modifier = Modifier
                    .fillMaxWidth(0.5f)
                    .aspectRatio(2.72f)
                    .align(Alignment.CenterHorizontally)
                    .padding(15.dp),
                contentDescription = ""
            )

            Row(modifier = Modifier.padding(top = 10.dp)) {
                AnimatedVisibility(visible = animate, enter = slideInHorizontally(tween(500)) {
                    -it
                }) {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth(0.5f)
                            .aspectRatio(1f)
                            .padding(5.dp)
                            .clickable {
                                navController.navigate("text")
                            },
                        colors = CardDefaults.cardColors(
                            containerColor = Purple40,
                            contentColor = Color.White
                        ),
                    ) {
                        Column(
                            modifier = Modifier.fillMaxSize(),
                            verticalArrangement = Arrangement.Center,
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Image(
                                painter = painterResource(id = R.drawable.text_input),
                                modifier = Modifier
                                    .fillMaxWidth(0.4f)
                                    .aspectRatio(1f),
                                contentDescription = ""
                            )
                            Text(
                                text = "Profile",
                                modifier = Modifier.padding(top = 10.dp),
                                fontSize = 18.sp,
                                textAlign = TextAlign.Center,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }
                AnimatedVisibility(
                    visible = animate,
                    enter = slideIn(tween(500)) { IntOffset(400, 0) },
                ) {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth(1f)
                            .aspectRatio(1f)
                            .padding(5.dp)
                            .clickable {
                                navController.navigate("image")
                            },
                        colors = CardDefaults.cardColors(
                            containerColor = Purple40,
                            contentColor = Color.White
                        ),
                    ) {
                        Column(
                            modifier = Modifier.fillMaxSize(),
                            verticalArrangement = Arrangement.Center,
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Image(
                                    painter = painterResource(id = R.drawable.text_input),
                                    modifier = Modifier
                                        .fillMaxWidth(0.3f)
                                        .aspectRatio(1f),
                                    contentDescription = ""
                                )

                                Image(
                                    painter = painterResource(id = R.drawable.image_input),
                                    modifier = Modifier
                                        .fillMaxWidth(0.5f)
                                        .aspectRatio(1f)
                                        .padding(0.dp)
                                        .padding(start = 10.dp),
                                    contentDescription = ""
                                )
                            }
                            Text(
                                text = "text-and-image\ninput",
                                modifier = Modifier.padding(top = 10.dp),
                                fontSize = 18.sp,
                                textAlign = TextAlign.Center,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }
            }
        }
    }
}