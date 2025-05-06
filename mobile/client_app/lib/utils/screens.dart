import 'package:client_app/screens/feed.dart';
import 'package:client_app/screens/shop.dart';
import 'package:flutter/material.dart';

class Nav {
  final Icon icon;
  final String label;
  final Widget screen;
  Nav({required this.icon, required this.label, required this.screen});
}

class Screen {
  List<Nav> _navs = [];

  Screen(List<Nav> navs) {
    _navs = navs;
  }
  List<Widget> getScreens() {
    List<Widget> screens = [];
    for(final obj in _navs) {
        screens.add(obj.screen);
    }

    return screens;
  }

  BottomNavigationBar getBottomNavigation({required int index, required Function onTap}) {
    List<BottomNavigationBarItem> navItems = [];
    for(final obj in _navs) {
      navItems.add(BottomNavigationBarItem(icon: obj.icon, label: obj.label));
    }
    return BottomNavigationBar(items: navItems, currentIndex: index, onTap: (index) {
      onTap(index);
    });
  }

}

Screen initScreens() {
  final List<Nav> navItems = [
    Nav(icon: Icon(Icons.pets_outlined), label: "Explore", screen: FeedScreen()),
    Nav(icon: Icon(Icons.shopping_basket), label: "Shop", screen: ShopScreen()),
    Nav(icon: Icon(Icons.shopping_basket), label: "Account", screen: FeedScreen()),
  ];
  return Screen(navItems);
}
