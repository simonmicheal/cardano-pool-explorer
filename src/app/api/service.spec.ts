// import { TestBed } from '@angular/core/testing';
// import { ExplorerService } from './services';

// describe('UsersService', () => {
//   let usersService: ExplorerService; // Add this

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [ExplorerService]
//     });

//     usersService = TestBed.get(ExplorerService); // Add this
//   });

//   it('should be created', () => { // Remove inject()
//     expect(usersService).toBeTruthy();
//   });

//    // Add tests for all() method
//    describe('all', () => {
//     it('should return a collection of users', () => {
//       const userResponse = [
//         {
//           id: '1',
//           name: 'Jane',
//           role: 'Designer',
//           pokemon: 'Blastoise'
//         },
//         {
//           id: '2',
//           name: 'Bob',
//           role: 'Developer',
//           pokemon: 'Charizard'
//         }
//       ];
//       let response;
//       spyOn(usersService, 'all').and.returnValue(of(userResponse));

//       usersService.all().subscribe(res => {
//         response = res;
//       });

//       expect(response).toEqual(userResponse);
//     });
//   });

// });