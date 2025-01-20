import 'package:flutter/material.dart';

class ShopScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
     return Scaffold(
      appBar: null,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center  ,
          children: <Widget>[
            const Text(
              'Welcome to Shop Page!',
            ),
          ],
        ),
      ),
    );
  }
}