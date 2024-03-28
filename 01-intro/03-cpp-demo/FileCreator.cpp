#include <fstream>
#include <iostream>
#include <string>

int main() {
  bool exit = false;  // Whether the application should keep running or exit
  while (!exit) {
    std::string name;     // The name of the file (path included)
    std::string content;  // The content of the file
    std::ofstream outfile;

    int option;

    std::cout << "Menu:" << std::endl;
    std::cout << "[1] Create a new file" << std::endl;
    std::cout << "[2] Exit" << std::endl;

    std::cout << "FileCreator> Please choose an option ";
    std::cin >> option;

    switch (option) {
      case 1:
        // Get the file name from the user
        std::cout << "FileCreator> Enter the name of the file: ";
        std::cin >> name;

        // Get the file content from the user
        std::cin.ignore();
        std::cout << "FileCreator> Enter the content of the file: ";
        std::getline(std::cin, content);

        // Create the file
        outfile.open(name);
        outfile << content << std::endl;
        outfile.close();

        std::cout << "The file has been created!" << std::endl;
        break;

      case 2:
        std::cout << "Exiting the application..." << std::endl;
        exit = true;
        break;
    }
  }
}
