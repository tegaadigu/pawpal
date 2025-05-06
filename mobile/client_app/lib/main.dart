import 'package:client_app/utils/screens.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PawPal Client App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color.fromARGB(255, 21, 21, 22)),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'PawPal'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _currentIndex = 0;
  Screen screen = initScreens();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screen.getScreens(),
      ),
      bottomNavigationBar: screen.getBottomNavigation(index: _currentIndex, onTap: (index) {
        setState(() {
          _currentIndex = index;
        });
      })
    );
  }
}
