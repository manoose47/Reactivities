using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity activity;
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;

            }

            // Does not return a value, as Commands should never return values. that's Queries job
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Add(request.activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}