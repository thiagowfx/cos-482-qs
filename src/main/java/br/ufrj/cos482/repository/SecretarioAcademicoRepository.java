package br.ufrj.cos482.repository;

import br.ufrj.cos482.domain.SecretarioAcademico;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SecretarioAcademico entity.
 */
@SuppressWarnings("unused")
public interface SecretarioAcademicoRepository extends JpaRepository<SecretarioAcademico,Long> {

}
