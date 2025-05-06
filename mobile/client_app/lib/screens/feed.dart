import 'package:client_app/widgets/add_service_button.dart';
import 'package:client_app/widgets/custom_card.dart';
import 'package:flutter/material.dart';

class FeedScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
     return Scaffold(
      appBar: AppBar(
        leading: IconButton(
            onPressed: () => {
            }, 
            icon: const Icon(Icons.density_medium)
          ),
        actions: [
          IconButton(
            onPressed: () => {
              showModalBottomSheet(context: context, builder: (BuildContext context) {
                return AddServiceButton(title: 'Test');
              })
            }, 
            icon: const Icon(Icons.add)
          )
        ]
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: <Widget>[
            Padding(padding: const EdgeInsets.only(bottom: 16.0), child: CustomCard(items: [
    {
      'title': 'Kukis Park',
      'imageUrl': 'https://picsum.photos/id/15/200/300',
      'rating': '4.7',
    },
    {
      'title': 'Ruths Park',
      'imageUrl': 'https://picsum.photos/id/16/200/300',
      'rating': '4.8',
    },
    {
      'title': '33 holly st',
      'imageUrl': 'https://picsum.photos/id/17/200/300',
      'rating': '4.6',
    },
    {
      'title': 'Tegas park',
      'imageUrl': 'https://picsum.photos/id/19/200/300',
      'rating': '4.5',
    },
  ])),
            Padding(padding: const EdgeInsets.only(bottom: 16.0), child: CustomCard(title: "Featured Parks", items: [
    {
      'title': 'Rothmon Park',
      'imageUrl': 'https://picsum.photos/id/10/200/300',
      'rating': '4.7',
    },
    {
      'title': 'Jai Bistro Park',
      'imageUrl': 'https://picsum.photos/id/12/200/300',
      'rating': '4.8',
    },
    {
      'title': 'holly st Garden',
      'imageUrl': 'https://picsum.photos/id/13/200/300',
      'rating': '4.6',
    },
    {
      'title': 'Kukilicious',
      'imageUrl': 'https://picsum.photos/id/11/200/300',
      'rating': '4.5',
    },
  ])),
            Padding(padding: const EdgeInsets.only(bottom: 16.0), child: CustomCard(title: "Missing Dogs Near You", items: [
    {
      'title': 'Hugh Jackman',
      'imageUrl': 'https://placedog.net/200/300?id=3',
      'reward': 'CAD 6000',
    },
   {
      'title': 'Jackie',
      'imageUrl': 'https://placedog.net/200/300?id=4',
      'reward': 'CAD 500',
    },
   {
      'title': 'Luigie',
      'imageUrl': 'https://placedog.net/200/300?id=5',
      'reward': 'CAD 7000',
    },
    {
      'title': 'Monroe',
      'imageUrl': 'https://placedog.net/200/300?id=6',
      'reward': 'CAD 250',
    },
  ])),
            Padding(padding: const EdgeInsets.only(bottom: 16.0), child: CustomCard(title: "Missing Posters")),
          ],
        ),
      ),
    );
  }
}