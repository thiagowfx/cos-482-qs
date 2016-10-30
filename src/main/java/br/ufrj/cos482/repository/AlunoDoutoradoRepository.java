package br.ufrj.cos482.repository;

import br.ufrj.cos482.domain.AlunoDoutorado;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the AlunoDoutorado entity.
 */
@SuppressWarnings("unused")
public interface AlunoDoutoradoRepository extends JpaRepository<AlunoDoutorado,Long> {

}
