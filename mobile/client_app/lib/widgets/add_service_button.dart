import 'package:flutter/material.dart';

class AddServiceButton extends StatefulWidget {
  const AddServiceButton({super.key, required this.title});
  final String title;
  @override
  State<AddServiceButton> createState() => _AddServiceButtonState();
}

class _AddServiceButtonState extends State<AddServiceButton> {
  String? _selectedSpot;
  final List<String> _items = ["Park", "Event", "Missing Dog"];
  @override
  Widget build(BuildContext context) {
    return Container(
        height: 400,
        child: Padding(
            padding: const EdgeInsets.all(16),
            child: Center(
                child: Column(children: [
              Padding(
                  padding: const EdgeInsets.all(16),
                  child: const Text("Add a Spot",
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold))),
              Padding(
                  padding: const EdgeInsets.all(16),
                  child: const Text("Add a new spot to the Pawpal Community")),
              Padding(
                  padding: const EdgeInsets.all(16),
                  child: DropdownButton(
                      value: _selectedSpot,
                      hint: Text("Select Spot to create."),
                      icon: Icon(Icons.arrow_drop_down),
                      items:
                          _items.map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                            value: value, child: Text(value));
                      }).toList(),
                      onChanged: (String? selectedValue) {
                        setState(() {
                          _selectedSpot = selectedValue;
                        });
                      })),
              Padding(
                  padding: const EdgeInsets.all(8),
                  child: ElevatedButton(
                      onPressed: () => {},
                      child: const Text("Create", style: TextStyle(fontSize: 16, color: Color.fromARGB(255, 6, 6, 6)))))
            ]))));
  }
}
